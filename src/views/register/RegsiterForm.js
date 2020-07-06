import React from 'react';
import { Button, Grid, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Field, reduxForm, reset } from 'redux-form';
import { renderTextField, renderSelectField, renderDateTimePicker, radioButton, renderNumberField, renderFileInput } from '../utilites/FromUtilites';

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


const RegisterFrom = (props) => {
    const { classes, RegisterUser, pristine, reset, submitting, handleSubmit } = props
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
            <div className={classes.buttonStyle}>
                <center>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> Submit </Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>
                </center>
            </div>
        </form>
    </div>
}

const SectionOne = (props) => {
    const { classes } = props
    return <div className={classes.root}>
        <div>
            {PersonalInfo({ classes })}
            {SkillSet({ classes })}
            {Assign({ classes })}
        </div>
    </div>
}

const PersonalInfo = (props) => {
    const { classes } = props
    return <Accordion expanded={true}>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> PERSONAL INFORMATION</AccordionSummary>
        <AccordionDetails>
            <div>
                {/* <Field name="profilePic" component="input" style={{ margin: 8 }} fullWidth type="file" /> */}
                <Field name="profilePic" className={classes.textField} type="file"  lable="Choose Profile Image" component={renderFileInput} />
                <Field name="firstName" className={classes.textField} component={renderTextField} label="First Name" />
                <Field name="lastName" className={classes.textField} component={renderTextField} label="Last Name" />
                <Field name="designation" component={renderTextField} label="Job Title" style={{ margin: 8 }} fullWidth helperText="Ex. Java Full Stack Developer" margin="normal" InputLabelProps={{ shrink: true }} />
                <Field name="expInYears" className={classes.textField} component={renderNumberField} label="Expriance" helperText="Ex. 2 years" margin="normal" />
                <Field name="password" className={classes.textField} component={renderTextField} label="Password" margin="normal" helperText="Password must contain [1...9][A...Z] and any special symbol" />
                <Field name="gender" className={classes.textField} component={radioButton} mainLableName="Gender" label={["male", "female"]} />
            </div>
        </AccordionDetails>
    </Accordion>
}

const SkillSet = (props) => {
    const { classes } = props
    return <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> SKILLS INFORMATION</AccordionSummary>
        <AccordionDetails>
            <Field name="primerySkill" component={renderSelectField} className={classes.textField} margin="normal" label="primary Skill" >
                {Skills.map((item, key) => <option key={key} value={item}>{item}</option>)}
            </Field>
            <Field name="secounderySkill" component={renderSelectField} className={classes.textField} margin="normal" label="Secondary Skill" >
                {Skills.map((item, key) => <option key={key} value={item}>{item}</option>)}
            </Field>
        </AccordionDetails>
    </Accordion>
}

const Assign = (props) => {
    const { classes } = props
    return <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> ASSIGN ROLES</AccordionSummary>
        <AccordionDetails>
            <div>
                <Field name="roles" component={renderSelectField} className={classes.textField} margin="normal" label="Roles" >
                    {Roles.map((item, key) => <option key={key} value={item}>{item}</option>)}
                </Field>
                <Field name="domain" component={renderSelectField} className={classes.textField} margin="normal" label="Domain" >
                    {Domain.map((item, key) => <option key={key} value={item}>{item}</option>)}
                </Field>
            </div>
        </AccordionDetails>
    </Accordion>
}

const SectionTwo = (props) => {
    const { classes } = props
    return <div>
        <div>
            <div />
            {ContactInfo({ classes })}
            {OtherInfo({ classes })}
        </div>
    </div>
}

const ContactInfo = (props) => {
    return <Accordion expanded={true}>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content" > CONTACT INFORMATION</AccordionSummary>
        <AccordionDetails>
            <div>
                <Field name="emailId" component={renderTextField} label="Work Mail"  style={{ margin: 8 }} fullWidth helperText="Ex. admin@rigvedtech.com" margin="normal" InputLabelProps={{ shrink: true }} />
                <Field name="mobileNumber" component={renderTextField} label="Phone" style={{ margin: 8 }} fullWidth helperText="Ex. 7653434533" margin="normal" InputLabelProps={{ shrink: true }} />
            </div>
        </AccordionDetails>
    </Accordion>
}

const OtherInfo = (props) => {
    return <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content" id="additional-actions1-header" > OTHER INFORMATION</AccordionSummary>
        <AccordionDetails>
            <div>
                <Field name="employeeNumber" component={renderTextField} label="Employee Code" style={{ margin: 8 }} fullWidth helperText="Ex. RV0001 " margin="normal" InputLabelProps={{ shrink: true }} />
                <Field name="dob" component={renderDateTimePicker} label="Date of Birth" style={{ margin: 8 }} fullWidth helperText="Ex. 15/02/2020" margin="normal" InputLabelProps={{ shrink: true }} />
                <Field name="ctc" component={renderTextField} label="CTC" style={{ margin: 8 }} fullWidth helperText="Ex. 5000" margin="normal" InputLabelProps={{ shrink: true }} />
            </div>
        </AccordionDetails>
    </Accordion>
}

const afterSubmit = (result, dispatch) => dispatch(reset('RegisterFrom'));
export default reduxForm({ form: 'RegisterFrom', onSubmitSuccess: afterSubmit })(RegisterFrom);
