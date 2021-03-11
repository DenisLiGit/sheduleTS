import {RootState} from "../redux-store";

export const isAuth = (state: RootState) => {
    return state.userReducer.isAuth
}

export const getErrorMessage = (state: RootState) => {
    return state.userReducer.userErrorMessage
}