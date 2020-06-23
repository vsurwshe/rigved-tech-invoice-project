import React, { useState } from "react";
import { Grid, Typography, Tabs, Tab} from "@material-ui/core";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch} from "../../context/UserContext";
import Login from "./UserLogin";
import Register from "../register/UserRegister";

const  UserActions=(props)=>{
    var classes = useStyles();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");

    return (
        <Grid container className={classes.container}>
            {/* <div className={classes.logotypeContainer}>
                <Typography className={classes.logotypeText}>Material Admin</Typography>
            </div> */}
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs value={activeTabId} onChange={(e, id) => setActiveTabId(id)} indicatorColor="primary" textColor="primary" centered >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                        {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment>
                        { Login({
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
                            })  
                        }          
                        </React.Fragment>
                    )}
                </div>
                <Typography color="primary" className={classes.copyright}>
                    © 2020-Rigved Technologies. All rights reserved.
        </Typography>
            </div>
        </Grid>
    );


}


export default UserActions;
