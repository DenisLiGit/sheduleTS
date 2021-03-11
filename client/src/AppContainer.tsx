import {connect, ConnectedProps} from "react-redux";
import {App} from "./App";
import {actions} from "./redux/userReducer";

const mapStateToProps = () => {
    return {}
}
const {userLogIn} = actions

const conector = connect(mapStateToProps,{
    userLogIn
})

export type AppContainerType = ConnectedProps<typeof conector>

const AppContainer = conector(App)

export default AppContainer