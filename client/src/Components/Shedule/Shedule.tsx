import React, {FC, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import {useFormik} from "formik";
import {validate} from "../../FormikValidation/SheduleValidation";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import type {AuthRedirectType} from "./SheduleContainer";

const styles = makeStyles((theme) => ({
    root: {
        padding: '16px 24px',
    },
    createForm: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '10px',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'row',
        },
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column',
        },
    },
    fields: {
        width: '100%',
        margin: '0 5px',
        [theme.breakpoints.down("lg")]: {
            maxWidth: 'calc(100% / 3.5)',
        },
        [theme.breakpoints.up("lg")]: {
            maxWidth: 'calc(100% / 6.5)',
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: '100%',
        },
    },
    descr: {
        width: '100%'
    },
    button: {
        marginRight: '10px'
    },
    error: {
        color: red[500]
    },
    saccess: {
        color: green[500]
    }
}))

export const Shedule: FC<AuthRedirectType> = (props) => {
    const {
        colors,
        dayOfWeek,
        timeStamps,
        icons,
        setSheduleThunk,
        initialValues,
        shedules,
        setSheduleErrorMessage,
        setInitialValues
    } = props
    const classes = styles()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validate,
        onSubmit: (values, {resetForm}) => {
            const dup = shedules.filter(item => JSON.stringify(item) === JSON.stringify(values))
            !dup.length ?
                setSheduleThunk(values, false)
                :
                setSheduleErrorMessage('Пометка уже существует')

            setInitialValues({
                title: '',
                dayOfWeek: 0,
                description: '',
                startDate: 0,
                endDate: 0,
                color: 'green',
                icon: 1,
                check: false,
                _id: ''
            })
            resetForm({})
        }
    })

    useEffect(() => {
    }, [initialValues])

    return (
        <Container className={classes.root}>
            <form className={classes.createForm} onSubmit={formik.handleSubmit}>
                <div className={classes.wrapper}>
                    <TextField
                        className={classes.fields}
                        id="title"
                        type="text"
                        name="title"
                        label="Название"
                        variant="standard"
                        autoComplete="off"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        className={classes.fields}
                        id="dayOfWeek"
                        select
                        name="dayOfWeek"
                        label="День недели"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                        value={formik.values.dayOfWeek}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.dayOfWeek)}
                        helperText={formik.touched.dayOfWeek && formik.errors.dayOfWeek}
                    >
                        {dayOfWeek.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.fields}
                        id="startDate"
                        select
                        name="startDate"
                        label="Начало"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.startDate)}
                        helperText={formik.touched.startDate && formik.errors.startDate}
                    >
                        {timeStamps.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.fields}
                        id="endDate"
                        select
                        name="endDate"
                        label="Окончание"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.endDate)}
                        helperText={formik.touched.endDate && formik.errors.endDate}
                    >
                        {timeStamps.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.fields}
                        id="color"
                        select
                        name="color"
                        label="Цвет"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
                    >
                        {colors.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.fields}
                        id="icon"
                        select
                        name="icon"
                        label="Иконка"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                        value={formik.values.icon}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.icon)}
                        helperText={formik.touched.icon && formik.errors.icon}
                    >
                        {icons.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div className={classes.wrapper}>
                    <TextField
                        className={classes.descr}
                        id="description"
                        type="textarea"
                        name="description"
                        label="Описание"
                        variant="standard"
                        autoComplete="off"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </div>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    type='submit'>Сохранить</Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        setInitialValues({
                            title: '',
                            dayOfWeek: 0,
                            description: '',
                            startDate: 0,
                            endDate: 0,
                            color: 'green',
                            icon: 1,
                            check: false,
                            _id: ''
                        })
                        formik.resetForm({})
                    }}
                >Очистить</Button>
            </form>
        </Container>
    )
}