import React, {FC} from "react";
import {makeStyles} from '@material-ui/core/styles';
import CardActionsContainer from "../CardActions/CardActionsContainer";
import Typography from "@material-ui/core/Typography";
import {GetIcon} from "../../Utils/Icons";
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import {Check} from "@material-ui/icons";
import type {SheduleCardContainerType} from "./SheduleCardContainer";

const styles = makeStyles((theme) =>({
    shedule: {
        height: '150px',
        marginRight: '7px',
        marginBottom: '7px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '5px',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down("lg")]: {
            width: 'calc((100% - 21px) / 3)',
        },
        [theme.breakpoints.up("lg")]: {
            width: 'calc((100% - 42px) / 6)',
        },
        [theme.breakpoints.down("sm")]: {
            width: 'calc((100% - 14px) / 2)',
        },
        [theme.breakpoints.down("xs")]: {
            width: '100%',
        },
    },
    infoWrap: {
        flexGrow: 1,
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
    },
    info: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: '-20px',
        right: '-20px',
        overflow: 'scroll'
    },
    infoRow: {
        wordBreak: 'break-all',
        lineHeight: 1.1,
        color: 'white'
    },
    icon: {
        position: 'absolute',
        left: '10px',
        top: '8px',
        color: 'white'
    },
    checkOverflow: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: grey[900],
        opacity: '0.8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkStatus: {
        fontSize: '10em',
        color: green[600]
    }
}))


export const SheduleCard: FC<SheduleCardContainerType> = (props) => {
    const {timeStamps, shedule, key} = props
    const classes = styles()

    const timeConvert = (timestamp: number): string => {
        const res = timeStamps.filter(item => item.value === timestamp)
        // console.log(res)
        return res[0].label
    }

    return (
        <div
            className={classes.shedule}
            key={key}
            style={{
                // @ts-ignore
                backgroundColor: shedule.color
            }}>
            <div className={classes.infoWrap}>
                <div className={classes.info}>
                    <div className={classes.icon}>
                        {GetIcon(shedule.icon)}
                    </div>
                    <Typography className={classes.infoRow} variant="h6" gutterBottom>
                        {timeConvert(Number(shedule.startDate))}-{timeConvert(Number(shedule.endDate))}
                    </Typography>
                    <Typography className={classes.infoRow} variant="h6" gutterBottom>
                        {shedule.title}
                    </Typography>
                    <Typography className={classes.infoRow} variant="body1">
                        {shedule.description}
                    </Typography>
                </div>
            </div>

            <CardActionsContainer shedule={shedule}/>
            {shedule.check && (
                <div className={classes.checkOverflow}>
                    <Check className={classes.checkStatus}/>
                </div>
            )}
        </div>
    )
}