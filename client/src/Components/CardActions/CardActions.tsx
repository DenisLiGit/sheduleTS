import React, {FC} from "react";
import {Edit, HighlightOff, Check} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import type {CardActionsContainerType} from "./CardActionsContainer";

const styles = makeStyles({
   root: {
       display: 'flex',
       justifyContent: 'space-between'
   },
    checkIcon: {
        color: lightGreen['A700'],
        background: 'white',
        borderRadius: '50%',
        boxSizing: 'border-box',
        padding: '2px'
    },
    editIcon: {
        color: orange[300],
        background: 'white',
        borderRadius: '50%',
        boxSizing: 'border-box',
        padding: '2px'
    },
    deleteIcon: {
        color: red['A700'],
        background: 'white',
        borderRadius: '50%',
        boxSizing: 'border-box',
        padding: '2px'
    },
    deleteIndex: {
       zIndex: 10
    }

})

export const CardActions: FC<CardActionsContainerType> = (props) => {
    const {
        updateSheduleThunk,
        editSheduleThunk,
        deleteSheduleThunk,
        shedule
    } = props
    const classes = styles()

    return (
        <div className={classes.root}>
            <Button onClick={() => {
                updateSheduleThunk(shedule)
            }}>
                <Check className={classes.checkIcon}/>
            </Button>
            <Button onClick={() => {
                editSheduleThunk(shedule._id)
            }}>
                <Edit className={classes.editIcon}/>
            </Button>
            <Button className={classes.deleteIndex} onClick={() => {
                deleteSheduleThunk(shedule._id)
            }}>
                <HighlightOff className={classes.deleteIcon} />
            </Button>
        </div>
    )
}