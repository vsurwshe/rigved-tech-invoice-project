import React from 'react';
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";

const Login=(props)=>{
    return <> 
    <Fade in={props.error}>
        <Typography color="secondary" className={props.classes.errorMessage}> Something is wrong with your login or password :( </Typography>
    </Fade>
    <TextField
        id="email"
        InputProps={{
            classes: { underline: props.classes.textFieldUnderline, input: props.classes.textField } 
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
            classes: { underline: props.classes.textFieldUnderline, input: props.classes.textField }
        }}
        value={props.passwordValue}
        onChange={e => props.setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
    />
    <div className={props.classes.formButtons}>
        {props.isLoading ? (
            <CircularProgress size={26} className={props.classes.loginLoader} />
        ) : (
                <Button
                    disabled={
                        props.loginValue.length === 0 || props.passwordValue.length === 0
                    }
                    onClick={() => loginUserActions(props)}
                    variant="contained"
                    color="primary"
                    size="large"
                > Login </Button>
            )}
        <Button color="primary" size="large" className={props.classes.forgetButton} > Forget Password </Button>
    </div></>
}

const loginUserActions=(props)=>{
    console.log(
        props.userDispatch,
        props.loginValue,
        props.passwordValue,
        props.history,
        props.setIsLoading,
        props.setError,
    )
}

export default Login;