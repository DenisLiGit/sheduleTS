import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Auth} from "./Auth";
import {loginThunk, registerThunk} from "../../redux/userReducer";
import {compose} from "redux";
import {SheduleRedirect} from "../../Hoc/AuthRedirect";
import {getErrorMessage, isAuth} from "../../redux/Selectors/userSelector";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    isAuth: boolean
    errorMessage: string | null
}

const mapStateToProps = (state: RootState): StatePropsI => {
    return {
        isAuth: isAuth(state),
        errorMessage: getErrorMessage(state)
    }
}

const conector = connect(mapStateToProps, {
    registerThunk,
    loginThunk,
})

export type SheduleRedirectType = ConnectedProps<typeof conector>

export default compose(
    conector,
    SheduleRedirect
)(Auth) as React.ComponentType