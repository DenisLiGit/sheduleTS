import userApi from "../Api/userApi";
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, RootState} from "./redux-store";

const initialState = {
    userId: null as string | null,
    isAuth: false as boolean,
    token: null as string | null,
    userErrorMessage: null as string | null
}

type inittialStateT = typeof initialState

const userReducer = (store = initialState, action: ActionTypes): inittialStateT => {
    switch (action.type) {
        case 'USER_LOG_IN':
            return {
                ...store,
                userId: action.payload.userId,
                token: action.payload.token,
                isAuth: !!action.payload.token
            }
        case 'USER_LOG_OUT':
            return {
                ...store,
                userId: null,
                token: null,
                isAuth: false,
            }
        case 'AUTH_ERROR_MESSAGE':
            return {
                ...store,
                userErrorMessage: action.payload
            }
        default:
            return store
    }
}

export interface authInfoI {
    userId: string | null
    token: string | null
    isAuth?: string
}

export interface userInfoI {
    email: string | null
    password: string | null
}

type ActionTypes = ActionsTypes<typeof actions>

export const actions = {
    userLogIn: (userInfo: authInfoI) => ({
        type: 'USER_LOG_IN', payload: userInfo
    } as const),
    userLogOut: () => ({
        type: 'USER_LOG_OUT'
    } as const),
    authErrorMessage: (message: string) => ({
        type: 'AUTH_ERROR_MESSAGE', payload: message
    } as const)
}

export const userLogOutThunk = ():
    ThunkAction<void, null, unknown, ActionTypes> =>
    (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        dispatch(actions.userLogOut())
    }

export const loginThunk = (userInfo: userInfoI):
    ThunkAction<Promise<void>, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        try {
            const res = await userApi.login(userInfo)
            if (res.token) {
                localStorage.setItem('token', res.token)
                localStorage.setItem('userId', res.userId)
                dispatch(actions.authErrorMessage(''))
                dispatch(actions.userLogIn(res))
            } else {
                dispatch(actions.authErrorMessage(res.data.message))
            }
        } catch (e) {
            dispatch(actions.authErrorMessage(e))
        }
    }

export const registerThunk = (userInfo: userInfoI):
    ThunkAction<Promise<void>, RootState, unknown, ActionTypes> =>
    async (dispatch) => {
        try {
            const res = await userApi.register(userInfo)
            if (res.status === 201) {
                dispatch(loginThunk(userInfo))
            } else {
                dispatch(actions.authErrorMessage(res.data.message))
            }
        } catch (error) {
            console.log('error', error)
            dispatch(actions.authErrorMessage(error))
        }
    }

export default userReducer