import React, {FC, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import type {AlertMessagePropsType} from "./AlertMessageContainer";

const styles = makeStyles({
    root: {
        position: 'fixed',
        right: '15px',
        bottom: '40px',
        padding: '10px 20px',
        backgroundColor: grey[700]
    },
    error: {
        color: red[500]
    },
    saccess: {
        color: green[500]
    }
})

export const AlertMessage: FC<AlertMessagePropsType> = (props) => {
    const {
        getInfoMessage,
        getErrorMessage,
        setSheduleErrorMessage,
        setSheduleInfoMessage
    } = props
    const classes = styles()

    useEffect(() => {
        setTimeout(() => {
            setSheduleErrorMessage('')
        }, 3000)
    }, [getErrorMessage])

    useEffect(() => {
        setTimeout(() => {
            setSheduleInfoMessage('')
        }, 3000)
    }, [getInfoMessage])

    return (
        <>
            {getInfoMessage && (
                <div className={classes.root}>
                    <Typography className={classes.saccess} variant="body2">
                        {getInfoMessage}
                    </Typography>
                </div>
            )}
            {getErrorMessage && (
                <div className={classes.root}>
                    <Typography className={classes.error} variant="body2">
                        {getErrorMessage}
                    </Typography>
                </div>
            )}
        </>
    )
}