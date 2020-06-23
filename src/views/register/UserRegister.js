import React from 'react';
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";

const Register = (props) => {
    return <> <Typography variant="h1" className={props.classes.greeting}> Welcome!</Typography>
        <Typography variant="h2" className={props.classes.subGreeting}>Create your account</Typography>
        <Fade in={props.error}>
            <Typography color="secondary" className={props.classes.errorMessage}> Something is wrong with your login or password :( </Typography>
        </Fade>
        <TextField
            id="name"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.nameValue}
            onChange={e => props.setNameValue(e.target.value)}
            margin="normal"
            placeholder="Full Name"
            type="text"
            fullWidth
        />
        <TextField
            id="email"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.loginValue}
            onChange={e => props.setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Email Adress"
            type="email"
            fullWidth
        />
        <TextField
            id="password"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.passwordValue}
            onChange={e => props.setPasswordValue(e.target.value)}
            margin="normal"
            placeholder="Password"
            type="password"
            fullWidth
        />
        <div className={props.classes.creatingButtonContainer}>
            {props.isLoading ? (
                <CircularProgress size={26} />
            ) : (
                    <Button
                        onClick={() =>
                            RegisterUser(props)
                        }
                        disabled={
                            props.loginValue.length === 0 ||
                            props.passwordValue.length === 0 ||
                            props.nameValue.length === 0
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={props.classes.createAccountButton}
                    >
                        Create your account
                    </Button>
                )}
        </div>
        {/* <div className={props.classes.formDividerContainer}>
            <div className={props.classes.formDivider} />
            <Typography className={props.classes.formDividerWord}>or</Typography>
            <div className={props.classes.formDivider} />
        </div>
        <Button
            size="large"
            className={classnames(
                props.classes.googleButton,
                props.classes.googleButtonCreating,
            )}
        >
            {/* <img src={google} alt="google" className={classes.googleIcon} />
&nbsp;Sign in with Google */}
        {/* </Button> */}
    </>
}

const RegisterUser = (props) => {
    console.log(props);
}

export default Register;