import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import googleIcon from "../../Images/google-icon.svg";
import "./Login.css";
import { Controller, useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { createAccountWithEmailAndPassword, handleGoogleSignIn, initializeFirebaseFramework, signInWithEmailAndPassword } from './LoginManager';


initializeFirebaseFramework();


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({});
    const [isRegistered, setRegistered] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleRegister = () => {
        setRegistered(!isRegistered)
        user.error = "";
    };

    const handleResponse = (res, isRedirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (isRedirect) {
            history.replace(from);
        }

    }

    const { register, handleSubmit, control } = useForm();
    const onSubmit = data => {
        const { email, password } = data;
        if (isRegistered && email && password) {
            createAccountWithEmailAndPassword(user.name, email, password)
                .then(res => {
                    handleResponse(res, false);
                });
        }
        if (!isRegistered && email && password) {
            signInWithEmailAndPassword(email, password)
                .then(res => {
                    handleResponse(res, true);
                });
        }
        return false;
    }

    // Handle user Input
    const handleInput = e => {
        let isValid = true;

        if (e.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            isValid = /^[a-zA-Z0-9]{6,}$/.test(e.target.value);
        }
        if (isValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            newUser["error_" + e.target.name] = false;
            setUser(newUser)
        } else if (!isValid) {
            const newUser = {};
            newUser["error_" + e.target.name] = true;
            setUser(newUser)
        }
    }


    const handleGoogle = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            });
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();

    return (
        <div>

            <Container className="LoginContainer" style={{ background: 'hsla(0, 0%, 100%, 0.5)' }} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                    <Typography component="h1" variant="h5"> {!isRegistered ? "Sign In" : "Sign Up"} </Typography>
                    {user.error ? <p className="validationError" style={{ color: "red" }}>{user.error}</p> : ""}
                    {user.success && isRegistered ? <p className="validationError" style={{ color: "green", fontSize: "20px" }}>Account Created..{isRegistered}</p> : ""}

                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {isRegistered &&
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        // onBlur={handleInput}
                                        as={
                                            <TextField autoComplete="fname" ref={register} variant="outlined" required fullWidth id="firstName" label="Name" autoFocus />
                                        } onKeyUp={handleInput} control={control} />
                                </Grid>
                            }

                            <Grid item xs={12}>
                                <Controller
                                    name="email"

                                    as={
                                        <TextField variant="outlined" required fullWidth id="email" default="" label="Email Address" />
                                    } onKeyUp={handleInput} control={control} />
                                {user.error_email ? <span style={{ color: "red" }}>Invalid Email</span> : ""}
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="password"

                                    as={
                                        <TextField variant="outlined" required fullWidth label="Password" type="password" id="password" autoComplete="current-password" />
                                    } onKeyUp={handleInput} control={control} />
                                {user.error_password ? <span style={{ color: "red" }}>Invalid Password [Minimum Six characters]</span> : ""}
                            </Grid>

                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> {!isRegistered ? "Sign In" : "Sign Up"}  </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link className="LoginUpLink" href="#" onClick={handleRegister} variant="body2">  {isRegistered ? "Having an account? Sign In" : "New User! Sign Up"} </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <div className="devider"> <div></div><strong>Or</strong><div></div></div>
            <div className="LogInGoogle">
                <button onClick={handleGoogle}> <img src={googleIcon} height="20px" alt="" /> <p>Continue With Google</p></button>
            </div>
        </div >
    );
};

export default Login;