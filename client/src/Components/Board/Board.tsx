import React, {FC, useEffect} from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import SheduleCardContainer from "../SheduleCard/SheduleCardContainer";
import grey from '@material-ui/core/colors/grey';
import type {SheduleThunkType} from "./BoardContainer";
import {sheduleI} from "../../redux/sheduleReducer";

const styles = makeStyles({
    wrap: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    sectionWrap: {
        backgroundColor: grey[200],
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: '7px',
        minHeight: '160px',
        marginBottom: '10px'
    },
    section: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        flexWrap: 'wrap'
    },
    shedule: {
        width: 'calc((100% - 42px) / 6)',
        height: '150px',
        marginRight: '7px',
        marginBottom: '7px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '5px'
    },
    day: {
        display: 'flex',
        alignItems: 'center',
        width: '40px',
        position: 'relative',
        '& > span': {
            transform: 'rotate(-90deg)',
            display: 'block',
            position: 'absolute',
            right: '-52px',
            width: '150px',
            textAlign: 'center'
        }
    }
})

export const Board: FC<SheduleThunkType> = (props) => {
    const {getSheduleThunk, shedules, dayOfWeek} = props
    const classes = styles()

    const renderShedules = (shedules: Array<sheduleI>, day: number): React.ReactNode | null => {
        return shedules.filter(item => {
            return item.dayOfWeek === day
        }).sort((a, b) => {
            return a.startDate - b.startDate;
        }).map((shedule, index) => {
            return (
                <SheduleCardContainer shedule={shedule} key={index}/>
            )
        })
    }

    const renderSection = () => {
        return dayOfWeek.map((day, index) => {
            if (!!shedules.find(d => d.dayOfWeek === index)) {
                return (
                    <div key={index} className={classes.sectionWrap}>
                        <div className={classes.day}>
                            <span>{day.label}</span>
                        </div>
                        <div className={classes.section}>
                            {renderShedules(shedules, index)}
                        </div>
                    </div>
                )
            }
        })
    }

    useEffect(() => {
        getSheduleThunk()
    }, [])

    return (
        (shedules && (
                <Container>
                    <div className={classes.wrap}>
                        {renderSection()}
                    </div>
                </Container>
            )
        )
    )
}