import {connect, ConnectedProps} from "react-redux";
import {getErrorMessage, getInfoMessage} from "../../redux/Selectors/sheduleSelector";
import {AlertMessage} from "./AlertMessage";
import {actions} from "../../redux/sheduleReducer";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    getInfoMessage: string | null
    getErrorMessage: string | null
}

const mapStateToProps = (state: RootState): StatePropsI => {
    return {
        getInfoMessage: getInfoMessage(state),
        getErrorMessage: getErrorMessage(state),
    }
}
const {setSheduleErrorMessage, setSheduleInfoMessage} = actions

const connector = connect(mapStateToProps, {
    setSheduleErrorMessage, setSheduleInfoMessage
})

const AlertMessageContainer = connector(AlertMessage)

export type AlertMessagePropsType = ConnectedProps<typeof connector>
export default AlertMessageContainer