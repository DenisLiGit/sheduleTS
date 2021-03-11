import {connect, ConnectedProps} from "react-redux";
import {Header} from "./Header";
import {isAuth} from "../../redux/Selectors/userSelector";
import {userLogOutThunk} from "../../redux/userReducer";
import {RootState} from "../../redux/redux-store";

interface StatePropsI {
    isAuth: boolean
}

const mapStateToProps = (state: RootState): StatePropsI => {
    return {
        isAuth: isAuth(state)
    }
}

const conector = connect(mapStateToProps, {
    userLogOutThunk
})

export type HeaderContainerType = ConnectedProps<typeof conector>

const HeaderContainer = conector(Header)

export default HeaderContainer