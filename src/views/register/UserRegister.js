import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { CircularProgress, Typography, Button, TextField, Fade, Card, Grid, Paper, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    girdContainer: {
        flexGrow: 1,
    }
}));

const Register = (props) => {
    const [spacing, setSpacing] = useState(3);
    var classes = useStyles();
    return <>
        <Card>
            <h1>Register User</h1>
            {RegsiterFrom({
                classes,
                spacing
            })}
        </Card>
        {/* <TextField
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
        /> */}
        {/* <TextField
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
        /> */}
        {/* <div className={props.classes.creatingButtonContainer}>
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
                        Register User Account
                    </Button>
                )}
        </div> */}
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

const RegsiterFrom = (props) => {
    const { classes, spacing } = props
    return <div className={classes.girdContainer}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                {SectionsOne({ classes })}
            </Grid>
            <Grid item xs={12} sm={6}>
                {SectionsOne({ classes })}
            </Grid>
        </Grid>
    </div>
}

const SectionsOne = (props) => {
    const { classes } = props
    return <div className={classes.root}>
        <div>
            <input
                type="file"
                id="standard-full-width"
                label="Choose Prfile Photo"
                style={{ margin: 8 }}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <div
                id="margin-none"
            />
              {PersonalInfo({classes})}
              {SkillSet({classes})}
        </div>
    </div>
}

const PersonalInfo=(props)=>{
    const {classes} =props
    return<>
    <TextField
                label="First Name"
                id="margin-dense"
                defaultValue=""
                className={classes.textField}
                helperText="Ex. Jon"
                margin="dense"
            />
            <TextField
                label="Last Name"
                id="margin-dense"
                className={classes.textField}
                helperText="Ex. Sena"
                margin="dense"
            />
            <TextField
                label="Job Title"
                id="standard-full-width"
                style={{ margin: 8 }}
                fullWidth
                helperText="Ex. Java Full Stack Developer"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Expriance"
                type="Number"
                id="margin-normal"
                className={classes.textField}
                helperText="Ex. 2"
                margin="normal"
            />
    </>
}

const SkillSet=(props)=>{
    const {}=props
    return <PopupState variant="popover" popupId="demo-popup-popover">
    {(popupState) => (
      <div>
        <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
          Open Popover
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {/* <Box p={2}> */}
            <Typography>The content of the Popover.</Typography>
          {/* </Box> */}
        </Popover>
      </div>
    )}
  </PopupState>
}

export default Register;
