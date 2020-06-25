import React from 'react';
import { CircularProgress, Typography, Button, TextField, Fade, } from "@material-ui/core";
import { connect } from 'react-redux';
import * as actionsCre from '../../redux/actions/LoginAction'

const Login=(props)=>{
const {error, classes, loginValue, setLoginValue, passwordValue,setPasswordValue}=props.data
return <> 
    <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}> Something is wrong with your login or password :( </Typography>
    </Fade>
    <TextField
        id="email"
        InputProps={{
            classes: { underline: classes.textFieldUnderline, input: classes.textField } 
        }}
        value={loginValue}
        onChange={e => setLoginValue(e.target.value)}
        margin="normal"
        placeholder="Email Address or Registerd Mobile Number"
        type="email"
        fullWidth
    />
    <TextField
        id="password"
        InputProps={{
            classes: { underline: classes.textFieldUnderline, input: classes.textField }
        }}
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
    />
    <div className={classes.formButtons}>
        {props.isLoading ? (
            <CircularProgress size={26} className={props.classes.loginLoader} />
        ) : (
                <Button
                    disabled={ loginValue.length === 0 || passwordValue.length === 0}
                    onClick={() => loginUserActions(props)}
                    variant="contained"
                    color="primary"
                    size="large"
                > Login </Button>
            )}
        <Button color="primary" size="large" className={classes.forgetButton} > Forget Password </Button>
    </div></>
}

const loginUserActions=(props)=>{
    const loginData={
        userName: props.data.loginValue,
        password: props.data.passwordValue
    }
    props.LoginUser(loginData);
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps, actionsCre)(Login);