import React from "react";
import {Redirect} from "react-router-dom";

export const AuthRedirect = (Component: React.FC) => {
    // @ts-ignore
    const AuthRedirectWrap = props => {
        if (!props.isAuth) return <Redirect to={'/auth'} />
        return <Component {...props} />
    }
    return AuthRedirectWrap
}

export const SheduleRedirect = (Component: React.FC) => {
    // @ts-ignore
    const AuthRedirectWrap = props => {
        if (props.isAuth) return <Redirect to={'/'} />
        return <Component {...props} />
    }
    return AuthRedirectWrap
}


