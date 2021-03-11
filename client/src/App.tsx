import './App.css';
import HeaderContainer from "./Components/Header/HeaderContainer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthContainer from "./Components/Auth/AuthContainer";
import SheduleContainer from "./Components/Shedule/SheduleContainer";
import {FC, useEffect} from "react";
import BoardContainer from "./Components/Board/BoardContainer";
import AlertMessageContainer from "./Components/AlertMessage/AlertMessageContainer";
import type {AppContainerType} from "./AppContainer";


export const App: FC<AppContainerType> = (props) => {
    const userLogIn = props.userLogIn

    useEffect(() => {
        userLogIn({
            "userId": localStorage.getItem('userId'),
            "token": localStorage.getItem('token'),
        })
    }, [userLogIn])

  return (
      <Router>
          <HeaderContainer />
          <Switch>
              <Route exact path='/'>
                  <SheduleContainer />
                  <BoardContainer />
                  <AlertMessageContainer />
              </Route>
              <Route exact path='/auth'>
                  <AuthContainer />
              </Route>
          </Switch>
      </Router>
  )
}

