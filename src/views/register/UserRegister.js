import React from 'react';
import { Card } from "@material-ui/core";
import useStyles from "./styles";
import { Alert } from '@material-ui/lab';
import RegsiterForm from './RegsiterForm';
import { connect } from 'react-redux';
import * as LoginActions from "../../redux/actions/LoginAction";

const Register = (props) => {
    var classes = useStyles();
    return <Card>
        <center><h1>Register User</h1></center>
        {props.message && <Alert severity="success" >{props.message}</Alert>}
        <RegsiterForm classes={classes} RegisterUser={(values) => { RegisterUser(values, props) }} />
    </Card>
}

const RegisterUser = (sendUserValues, props) => {
    console.log("Register User Data : ", sendUserValues, props);

}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps, LoginActions)(Register);
