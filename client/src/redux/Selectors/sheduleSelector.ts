import {RootState} from "../redux-store";

export const getColors = (state: RootState) => {
    return state.sheduleReducer.colors
}

export const getIcons = (state: RootState) => {
    return state.sheduleReducer.icons
}

export const getdayOfWeek = (state: RootState) => {
    return state.sheduleReducer.dayOfWeek
}

export const gettimeStamps = (state: RootState) => {
    return state.sheduleReducer.timeStamps
}

export const getInitialValues = (state: RootState) => {
    return state.sheduleReducer.initialValues
}

export const getInfoMessage = (state: RootState) => {
    return state.sheduleReducer.sheduleInfoMessage
}

export const getErrorMessage = (state: RootState) => {
    return state.sheduleReducer.sheduleErrorMessage
}