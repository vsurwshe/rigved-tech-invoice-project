import React, { useState, useEffect } from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch } from "../../context/UserContext";
import Login from "./UserLogin";
import { connect } from "react-redux";
import Layout from "../../layout/Layout";

const UserActions = (props) => {
    var classes = useStyles();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [loginValue, setLoginValue] = useState("ritesh.joshi@rigvedtech.com");
    var [passwordValue, setPasswordValue] = useState("tima2209");
    // var [loginValue, setLoginValue] = useState("9986063632");
    // var [passwordValue, setPasswordValue] = useState("Qwerty@1");

    useEffect(()=>{},props.message)
    const data = {
        loginValue,
        passwordValue,
        isLoading,
        props,
        error,
        setIsLoading,
        setLoginValue,
        setPasswordValue,
        setError,
        classes,
        userDispatch
    }

    if(props.authorization && props.authorization !== "" ){
        return <Layout />
    }

    return (
        <Grid container className={classes.container}>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs value={activeTabId} onChange={(e, id) => setActiveTabId(id)} indicatorColor="primary" textColor="primary" centered >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                    </Tabs>
                    {console.log("mess 2",props)}
                    <Login data={data} />
                </div>
                <Typography color="primary" className={classes.copyright}> © 2020-Rigved Technologies. All rights reserved.</Typography>
            </div>
        </Grid>
    );
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(UserActions);
