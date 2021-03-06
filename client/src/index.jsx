import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './index.css';
import AppContainer from './AppContainer';
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import {Provider} from "react-redux";

ReactDOM.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
