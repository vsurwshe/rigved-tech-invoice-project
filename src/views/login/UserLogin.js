import React from 'react';
import { CircularProgress, Button, TextField} from "@material-ui/core";
import { connect } from 'react-redux';
import * as actionsCre from '../../redux/actions/LoginAction'
import { API_EXE_TIME } from '../../assets/config/Config';

const Login=(props)=>{
const {classes, loginValue, setLoginValue, passwordValue,setPasswordValue}=props.data
return <> 
    <TextField
        id="email"
        InputProps={{ classes: { underline: classes.textFieldUnderline, input: classes.textField }}}
        value={loginValue}
        onChange={e => setLoginValue(e.target.value)}
        margin="normal"
        placeholder="Email Address or Registerd Mobile Number"
        type="email"
        fullWidth
    />
    <TextField
        id="password"
        InputProps={{ classes: { underline: classes.textFieldUnderline, input: classes.textField } }}
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
    />
    <div className={classes.formButtons}>
        {props.data.isLoading ? ( <CircularProgress size={26}/>
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

const loginUserActions= async(props)=>{
    const loginData={
        userName: props.data.loginValue,
        password: props.data.passwordValue
    }
    props.data.setIsLoading(true);
    await props.LoginUser(loginData);
    setTimeout(async () => {
    await props.loadMessage();
    await props.data.setIsLoading(false);
    }, API_EXE_TIME)
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps, actionsCre)(Login);