import {RootState} from "../redux-store";

export const getShedules = (state: RootState) => {
    return state.sheduleReducer.shedules
}

export const getUpdate = (state: RootState) => {
    return state.sheduleReducer.update
}