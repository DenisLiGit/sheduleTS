import {connect, ConnectedProps} from "react-redux";
import {CardActions} from "./CardActions";
import {deleteSheduleThunk, editSheduleThunk, sheduleI, updateSheduleThunk} from "../../redux/sheduleReducer";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    shedule: sheduleI
}

const mapStateToProps = (state: RootState, ownProps:StatePropsI ): StatePropsI => {
    return {
        shedule: ownProps.shedule
    }
}

const conector = connect(mapStateToProps, {
    updateSheduleThunk,
    editSheduleThunk,
    deleteSheduleThunk
})

export type CardActionsContainerType= ConnectedProps<typeof conector>

const CardActionsContainer = conector(CardActions)

export default CardActionsContainer