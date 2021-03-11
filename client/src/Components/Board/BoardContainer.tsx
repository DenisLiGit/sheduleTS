import {connect, ConnectedProps} from "react-redux";
import {Board} from "./Board";
import {getSheduleThunk, selectsI, sheduleI} from "../../redux/sheduleReducer";
import {getShedules} from "../../redux/Selectors/boardSelector";
import {getdayOfWeek, gettimeStamps} from "../../redux/Selectors/sheduleSelector";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    shedules: Array<sheduleI> | []
    dayOfWeek: Array<selectsI>
    timeStamps: Array<selectsI>
}

const mapStateToProps = (state: RootState):StatePropsI => {
    return {
        shedules: getShedules(state),
        dayOfWeek: getdayOfWeek(state),
        timeStamps: gettimeStamps(state),
    }
}

const conector = connect(mapStateToProps, {
    getSheduleThunk,
})

export type SheduleThunkType = ConnectedProps<typeof conector>

const BoardContainer = conector(Board)

export default BoardContainer