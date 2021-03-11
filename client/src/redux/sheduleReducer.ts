import sheduleApi from "../Api/sheduleApi";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import {sheduleValues} from "../SheduleValues/SheduleValues";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, RootState} from "./redux-store";

export interface sheduleI {
    title: null | string
    dayOfWeek: number
    description: null | string
    startDate: number
    endDate: number
    color: null | string
    icon: number
    check: boolean
    _id: string
}

export interface selectsI {
    value: number,
    label: string,
}

export interface colorsI {
    value: string,
    label: string,
}

interface initialStateI {
    shedules: Array<sheduleI> | []
    initialValues: sheduleI
    dayOfWeek: Array<selectsI>
    timeStamps: Array<selectsI>
    colors: Array<colorsI>
    icons: Array<selectsI>
    sheduleInfoMessage: null | string
    sheduleErrorMessage: null | string
    update: boolean
}

const initialState: initialStateI = {
    shedules: [],
    initialValues: {
        title: '',
        dayOfWeek: 0,
        description: '',
        startDate: 0,
        endDate: 0,
        color: 'green',
        icon: 1,
        check: false,
        _id: ''
    },
    dayOfWeek: sheduleValues.dayOfWeek,
    timeStamps: sheduleValues.timeStamps,
    colors: [
        {
            value: green[500],
            label: 'Зеленый',
        },
        {
            value: red[500],
            label: 'Красный',
        },
        {
            value: blue[500],
            label: 'Синий',
        },
        {
            value: purple[500],
            label: 'Фиолетовый',
        },
        {
            value: orange[500],
            label: 'Оранжевый',
        },
        {
            value: grey[900],
            label: 'Черный',
        },
    ],
    icons: sheduleValues.icons,
    sheduleInfoMessage: '',
    sheduleErrorMessage: '',
    update: false
}

const sheduleReducer = (store = initialState, action: ActionTypes): initialStateI => {
    switch (action.type) {
        case 'INFO_MESSAGE':
            return {
                ...store,
                sheduleInfoMessage: action.payload
            }
        case 'SHEDULE_ERROR_MESSAGE':
            return {
                ...store,
                sheduleErrorMessage: action.payload
            }
        case 'SET_SHEDULE':
            return {
                ...store,
                shedules: [...store.shedules, action.payload]
            }
        case 'GET_SHEDULE':
            return {
                ...store,
                shedules: [...action.payload]
            }
        case 'SET_INITIAL_VALUES':
            return {
                ...store,
                initialValues: action.payload
            }
        case 'DELETE_SHEDULE':
            return {
                ...store,
                shedules: store.shedules.filter(item => item._id !== action.payload)
            }
        default:
            return store
    }
}

type ActionTypes = ActionsTypes<typeof actions>

export const actions = {
    setSheduleInfoMessage: (message: string) => ({
        type: 'INFO_MESSAGE', payload: message
    } as const),
    setSheduleErrorMessage: (message: string) => ({
        type: 'SHEDULE_ERROR_MESSAGE', payload: message
    } as const), setShedule: (shedule: sheduleI) => ({
        type: 'SET_SHEDULE', payload: shedule
    } as const),
    getShedule: (shedules: Array<sheduleI>) => ({
        type: 'GET_SHEDULE', payload: shedules
    } as const),
    setInitialValues: (shedule: sheduleI) => ({
        type: 'SET_INITIAL_VALUES', payload: shedule
    } as const),
    deleteShedule: (sheduleId: string) => ({
        type: 'DELETE_SHEDULE', payload: sheduleId
    } as const)
}


export const updateSheduleThunk = (shedule: sheduleI):
    ThunkAction<Promise<void> | sheduleI, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        shedule.check = true
        dispatch(setSheduleThunk(shedule))
    }

export const setSheduleThunk = (shedule: sheduleI):
    ThunkAction<Promise<void> | sheduleI, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        const userId = localStorage.getItem('userId')
        try {
            const res = await sheduleApi.setShedule(userId, shedule)
            dispatch(actions.setShedule(shedule))
            dispatch(getSheduleThunk())
        } catch (e) {
            dispatch(actions.setSheduleErrorMessage(e))
        }
    }

export const getSheduleThunk = ():
    ThunkAction<Promise<void>, RootState | Array<sheduleI>, unknown, ActionTypes> =>
    async (dispatch) => {
        const userId = localStorage.getItem('userId')
        try {
            const res = await sheduleApi.getShedule(userId)
            if (!res.message) {
                dispatch(actions.getShedule(res.shedule))
            } else {
                dispatch(actions.setSheduleErrorMessage(res.message))
            }
        } catch (error) {
            dispatch(actions.setSheduleErrorMessage(error))
        }
    }

export const editSheduleThunk = (sheduleId: string):
    ThunkAction<Promise<void>, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        const userId = localStorage.getItem('userId')
        try {
            const res = await sheduleApi.editShedule(userId, sheduleId)
            if (!res.message) {
                dispatch(actions.setInitialValues(res.data.shedule))
                dispatch(getSheduleThunk())
            } else {
                dispatch(actions.setSheduleErrorMessage(res.message))
            }
        } catch (error) {
            dispatch(actions.setSheduleErrorMessage(error))
        }
    }

export const deleteSheduleThunk = (sheduleId: string):
    ThunkAction<Promise<void>, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        const userId = localStorage.getItem('userId')
        try {
            const res = await sheduleApi.deleteShedule(userId, sheduleId)
            if (!res.message) {
                dispatch(actions.deleteShedule(sheduleId))
                dispatch(getSheduleThunk())
            } else {
                dispatch(actions.setSheduleErrorMessage(res.message))
            }
        } catch (error) {
            dispatch(actions.setSheduleErrorMessage(error))
        }
    }

// @ts-ignore
export default sheduleReducer