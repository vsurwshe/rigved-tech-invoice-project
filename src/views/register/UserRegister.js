import React from 'react';
import { Card } from "@material-ui/core";
import useStyles from "./styles";
import { Alert } from '@material-ui/lab';
import RegsiterForm from './RegsiterForm';
import { connect } from 'react-redux';
import * as LoginActions from "../../redux/actions/LoginAction";
import { API_EXE_TIME } from '../../assets/config/Config';

const Register = (props) => {
    var classes = useStyles();
    return <Card>
        <center><h1>Register User</h1></center>
        {props.LoginState.common_message && <Alert severity={props.LoginState.color} >{props.LoginState.common_message}</Alert>}
        <RegsiterForm classes={classes} RegisterUser={(values) => { RegisterUser(values, props) }} />
    </Card>
}

const RegisterUser = async(sendUserValues, props) => {
    await props.RegisterUser(sendUserValues, props.LoginState.authorization)
    setTimeout(async () => {
        await props.loadMessage()
        // await setLoading(loading = !loading);
    }, API_EXE_TIME)
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps, LoginActions)(Register);
