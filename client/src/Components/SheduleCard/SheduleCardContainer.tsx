import {connect, ConnectedProps} from "react-redux";
import {SheduleCard} from "./SheduleCard";
import {gettimeStamps} from "../../redux/Selectors/sheduleSelector";
import {RootState} from "../../redux/redux-store";
import {selectsI, sheduleI} from "../../redux/sheduleReducer";

interface StatePropsI {
    timeStamps: Array<selectsI>
    shedule: sheduleI
    key: number
}
interface OwnPropsI {
    shedule: sheduleI
    key: number
}

const mapStateToProps = (state: RootState, ownProps: OwnPropsI): StatePropsI => {
    return {
        timeStamps: gettimeStamps(state),
        shedule: ownProps.shedule,
        key: ownProps.key
    }
}

const conector = connect(mapStateToProps, {})

export type SheduleCardContainerType = ConnectedProps<typeof conector>

const SheduleCardContainer = conector(SheduleCard)

export default SheduleCardContainer