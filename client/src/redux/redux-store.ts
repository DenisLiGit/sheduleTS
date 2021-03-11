import userReducer from "./userReducer";
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import sheduleReducer from "./sheduleReducer";


const reducer = combineReducers({
    userReducer,
    sheduleReducer
})

export type RootState = ReturnType<typeof reducer>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store