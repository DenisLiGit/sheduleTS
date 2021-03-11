import React, {FC} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import type {HeaderContainerType} from "./HeaderContainer";

const styles = makeStyles({
    root: {
        backgroundColor: grey[900],
    },
    wrap: {
        display: 'flex',
        justifyContent: 'space-between',
    }
})

export const Header: FC<HeaderContainerType> = (props) => {
    const {isAuth, userLogOutThunk} = props

    const classes = styles()

    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.wrap}>
                    <Typography variant="h6">
                        Shedule
                    </Typography>
                    {isAuth && <Button onClick={userLogOutThunk} color="inherit">logout</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )
}