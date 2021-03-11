import React, {FC, useState} from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import {validationSchema} from "../../FormikValidation/AuthValidation";
import red from '@material-ui/core/colors/red';

import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import type {SheduleRedirectType} from "./AuthContainer";

const styles = makeStyles({
    root: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100%',
        maxWidth: '300px',
        padding: '10px',
        boxSizing: 'border-box'
    },
    fields: {
        width: '100%',
        marginBottom: '10px',
        '& div': {
            backgroundColor: 'white'
        }
    },
    buttons: {
        width: '100%',
        marginBottom: '5px'
    },
    error: {
        color: red[500]
    }
})

interface AuthInfoI {
    email: string | null
    password: string | null
}

export const Auth: FC<SheduleRedirectType> = (props) => {
    const {registerThunk, loginThunk, errorMessage} = props
    const [register, setRegister] = useState(false)
    const classes = styles()

    const submitType = {
        registerSubmit() {
            setRegister(true)
        },
        loginSubmit() {
            setRegister(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: AuthInfoI) => {
            register ? registerThunk(values) : loginThunk(values)
        }
    })

    return (
        <Container className={classes.root}>
            <Card className={classes.card}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        className={classes.fields}
                        id="email"
                        type="text"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="filled"
                    />
                    <TextField
                        className={classes.fields}
                        id="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        autoComplete="current-password"
                        variant="filled"
                    />
                    <Button
                        className={classes.buttons}
                        onClick={submitType.registerSubmit}
                        color="primary"
                        variant="contained"
                        type='submit'>Регистрация</Button>
                    <Button
                        className={classes.buttons}
                        onClick={submitType.loginSubmit}
                        color="primary"
                        variant="contained"
                        type='submit'>Вход</Button>
                    {errorMessage && (
                        <Typography className={classes.error} variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                </form>
            </Card>
        </Container>
    )
}