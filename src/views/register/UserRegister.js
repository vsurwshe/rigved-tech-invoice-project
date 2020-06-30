import React, { useState } from 'react';
import { Button, Card, Grid, ClickAwayListener } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderSelectField, renderDateTimePicker } from '../utilites/FromUtilites';
import useStyles from "./styles";

// this is maping skills
const Skills = [
    "Java",
    "React JS",
    "Angular Js",
    "Dot Net"
]

// this is maping roles
const Roles = [
    "Administrator",
    "Project Manager",
    "Employee"
]

// this is maping domain
const Domain = [
    "SAP Technical",
    "SAP Non-Technical",
    "Non SAP-Technical"
]

const Register = (props) => {
    var classes = useStyles();
    return <>
        <Card>
            <h1>Register User</h1>
            {RegisterFrom({ classes, data: props })}
        </Card>
    </>
}

const RegisterUser = (props) => {
    console.log("Register User Data : ", props);
}

const RegisterFrom = (props) => {
    const { classes, } = props
    const { pristine, reset, submitting, handleSubmit } = props.data
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(RegisterUser)}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    {SectionOne({ classes })}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {SectionTwo({ classes })}
                </Grid>
            </Grid>
            <center>
                <Button type="submit" coloe="primary" disabled={pristine || submitting}> Submit </Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>
            </center>
        </form>
    </div>
}

const SectionOne = (props) => {
    const { classes } = props
    return <div className={classes.root}>
        <div>
            <input type="file" id="standard-full-width" label="Choose Prfile Photo" style={{ margin: 8 }} fullWidth InputLabelProps={{ shrink: true }} />
            <div id="margin-none" />
            {PersonalInfo({ classes })}
            {SkillSet({ classes })}
            {Assign({ classes })}
        </div>
    </div>
}

const PersonalInfo = (props) => {
    const { classes } = props
    return <>
        <Field name="firstName" className={classes.textField} component={renderTextField} label="First Name" />
        <Field name="lastName" className={classes.textField} component={renderTextField} label="Last Name" />
        <Field name="designation" component={renderTextField} label="Job Title" id="standard-full-width" style={{ margin: 8 }} fullWidth helperText="Ex. Java Full Stack Developer" margin="normal" InputLabelProps={{ shrink: true }} />
        <Field name="expInYears" component={renderTextField} id="margin-normal" className={classes.textField} helperText="Ex. 2" margin="normal" />
    </>
}

const SkillSet = (props) => {
    const { classes } = props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };
    return <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.clickAwayListenerRoot}>
            <Button type="button" onClick={handleClick}> Skills </Button>
            {open ? (
                <div className={classes.clickAwayListenerDropdown}>
                    <Field classes={classes.textField} name="primerySkill" component={renderSelectField} label="primary Skill" >
                        {Skills.map((item, key) => <option key={key} value={item}>{item}</option>)}
                    </Field>
         &nbsp;&nbsp;&nbsp;
                    <Field classes={classes.textField} name="secounderySkill" component={renderSelectField} label="Secondary Skill" >
                        {Skills.map((item, key) => <option key={key} value={item}>{item}</option>)}
                    </Field>
                </div>
            ) : null}
        </div>
    </ClickAwayListener>
}


const Assign = (props) => {
    const { classes } = props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };

    return <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.clickAwayListenerRoot}>
            <Button type="button" onClick={handleClick}> Assign </Button>
            {open ? (
                <div className={classes.clickAwayListenerDropdown}>
                    <Field classes={classes.textField} name="roles" component={renderSelectField} label="Roles" >
                        {Roles.map((item, key) => <option key={key} value={item}>{item}</option>)}
                    </Field>
         &nbsp;&nbsp;&nbsp;
                    <Field classes={classes.textField} name="domain" component={renderSelectField} label="Domain" >
                        {Domain.map((item, key) => <option key={key} value={item}>{item}</option>)}
                    </Field>
                </div>
            ) : null}
        </div>
    </ClickAwayListener>
}

const SectionTwo = (props) => {
    const { classes } = props
    return <div>
        <div>
            <div id="margin-none" />
            {ContactInfo({ classes })}
            {OtherInfo({ classes })}
        </div>
    </div>
}

const ContactInfo = (props) => {
    const { classes } = props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };

    return <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.clickAwayListenerRoot}>
            <Button type="button" onClick={handleClick}> Contact Info </Button>
            {open ? (
                <div className={classes.clickAwayListenerDropdown}>
                    <Field name="emailId" component={renderTextField} label="Work Mail" id="standard-full-width" style={{ margin: 8 }} fullWidth helperText="Ex. admin@rigvedtech.com" margin="normal" InputLabelProps={{ shrink: true }} />
                    <Field name="mobileNumber" component={renderTextField} label="Phone" style={{ margin: 8 }} fullWidth helperText="Ex. 7653434533" margin="normal" InputLabelProps={{ shrink: true }} />
                </div>
            ) : null}
        </div>
    </ClickAwayListener>
}

const OtherInfo = (props) => {
    const { classes } = props
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen((prev) => !prev); };
    const handleClickAway = () => { setOpen(false); };

    return <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.clickAwayListenerRoot}>
            <Button type="button" onClick={handleClick}> Other Info </Button>
            {open ? (
                <div className={classes.clickAwayListenerDropdown}>
                    <Field name="employeeNumber" component={renderTextField} label="Employee Code" id="standard-full-width" style={{ margin: 8 }} fullWidth helperText="Ex. RV0001 " margin="normal" InputLabelProps={{ shrink: true }} />
                    <Field name="dob" component={renderDateTimePicker} label="Date of Birth" id="standard-full-width" style={{ margin: 8 }} fullWidth helperText="Ex. 7653434533" margin="normal" InputLabelProps={{ shrink: true }} />
                </div>
            ) : null}
        </div>
    </ClickAwayListener>
}
export default reduxForm({ form: 'Register' })(Register);
