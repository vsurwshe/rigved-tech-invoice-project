import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Typography, Button, TextField, Card, Grid, ClickAwayListener} from "@material-ui/core";
import MaterialUiForm from "../utilites/ReduxForm";
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderSelectField } from '../utilites/FromUtilites';

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
    },
    clickAwayListenerRoot: {
        position: 'relative',
    },
    clickAwayListenerDropdown: {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      zIndex: 1,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
}));

const Skills=[
    "Java",
    "React JS",
    "Angular Js",
    "Dot Net"
]

const Roles=[
    "Administrator",
    "Project Manager",
    "Employee"
]

const Domain=[
    "SAP Technical",
    "SAP Non-Technical",
    "Non SAP-Technical"
]


const Register = (props) => {
    var classes = useStyles();
    return <>
        <Card>
            <h1>Register User</h1>
            {RegsiterFrom({ 
                classes ,
                data: props
            })}
        </Card>
    </>
}

const RegisterUser = (props) => {
    console.log("Register User Data : ",props);
}

const RegsiterFrom = (props) => {
    const {classes}=props
    const { pristine, reset, submitting} = props.data
    return <div className={classes.girdContainer}>
        <form onSubmit={RegisterUser}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                {SectionsOne({ classes })}
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
        <center>
            <Button type="submit" coloe="primary" disabled={pristine || submitting}> Submit </Button>
            <Button type="button" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>
        </center>
        </form>
    </div>
}

const SectionsOne = (props) => {
    const { classes } = props
    return <div className={classes.root}>
        <div>
            <input type="file" id="standard-full-width" label="Choose Prfile Photo" style={{ margin: 8 }} fullWidth InputLabelProps={{ shrink: true }} />
            <div id="margin-none" />
              {PersonalInfo({classes})}
              {SkillSet({classes})}
              {Assign({classes})}
        </div>
    </div>
}

const PersonalInfo=(props)=>{
    const {classes} =props
    return<>
    <Field name="firstName" className={classes.textField} component={renderTextField} label="First Name" />
    <Field name="lastName" className={classes.textField} component={renderTextField} label="Last Name" />
    <Field name="jobTitle" component={renderTextField} label="Job Title" id="standard-full-width" style={{ margin: 8 }} fullWidth helperText="Ex. Java Full Stack Developer" margin="normal" InputLabelProps={{shrink: true}} />
    <Field name="expriance" component={renderTextField} id="margin-normal" className={classes.textField} helperText="Ex. 2" margin="normal"/>
    </>
}

const SkillSet=(props)=>{
    const {classes}=props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };

    return <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.clickAwayListenerRoot}>
      <Button type="button" onClick={handleClick}>
        Skills
      </Button>
      {open ? (
        <div className={classes.clickAwayListenerDropdown}>
          <Field classes={classes.textField} name="primarySkill" component={renderSelectField} label="primary Skill" >
            {Skills.map((item ,key)=> <option key={key} value={item}>{item}</option> )}
         </Field>
         &nbsp;&nbsp;&nbsp;
         <Field classes={classes.textField} name="secondarySkill" component={renderSelectField} label="Secondary Skill" >
            {Skills.map((item ,key)=> <option key={key} value={item}>{item}</option> )}
         </Field>
        </div>
      ) : null}
    </div>
  </ClickAwayListener>
}


const Assign=(props)=>{
    const {classes}=props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };

    return <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.clickAwayListenerRoot}>
      <Button type="button" onClick={handleClick}> Assign </Button>
      {open ? (
        <div className={classes.clickAwayListenerDropdown}>
          <Field classes={classes.textField} name="roles" component={renderSelectField} label="Roles" >
            {Roles.map((item ,key)=> <option key={key} value={item}>{item}</option> )}
         </Field>
         &nbsp;&nbsp;&nbsp;
         <Field classes={classes.textField} name="domain" component={renderSelectField} label="Domain" >
            {Domain.map((item ,key)=> <option key={key} value={item}>{item}</option> )}
         </Field>
        </div>
      ) : null}
    </div>
  </ClickAwayListener>
}


export default  reduxForm({ form: 'Register'})(Register);
