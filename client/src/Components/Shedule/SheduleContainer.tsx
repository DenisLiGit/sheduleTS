import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Shedule} from "./Shedule";
import {compose} from "redux";
import {AuthRedirect} from "../../Hoc/AuthRedirect";
import {isAuth} from "../../redux/Selectors/userSelector";
import {
    getColors,
    getdayOfWeek,
    getIcons,
    getInitialValues,
    gettimeStamps
} from "../../redux/Selectors/sheduleSelector";
import {setSheduleThunk, actions, sheduleI, selectsI, colorsI} from "../../redux/sheduleReducer";
import {getShedules} from "../../redux/Selectors/boardSelector";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    isAuth: boolean
    colors: Array<colorsI>
    icons: Array<selectsI>
    shedules: Array<sheduleI> | []
    dayOfWeek: Array<selectsI>
    timeStamps: Array<selectsI>
    initialValues: sheduleI
}

const mapStateToProps = (state: RootState): StatePropsI => {
    return {
        isAuth: isAuth(state),
        colors: getColors(state),
        icons: getIcons(state),
        shedules: getShedules(state),
        dayOfWeek: getdayOfWeek(state),
        timeStamps: gettimeStamps(state),
        initialValues: getInitialValues(state),
    }
}

const {setSheduleErrorMessage} = actions

const conector = connect(mapStateToProps, {setSheduleThunk, setSheduleErrorMessage})

export type AuthRedirectType = ConnectedProps<typeof conector>

export default compose(
    conector,
    AuthRedirect
)(Shedule) as React.ComponentType