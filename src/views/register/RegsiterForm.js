import React from 'react';
import { Button, Grid, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "@material-ui/core";
import { Field, reduxForm, reset } from 'redux-form';
import { renderTextField, renderSelectField, renderAutocompleteByName, renderDateTimePicker, radioButton, renderNumberField, renderFileInput } from '../utilites/FromUtilites';
import useStyles from "./styles";
import { connect } from 'react-redux';
import { Required } from '../utilites/FormValidation';


// // this is maping roles
const Roles = [
    {name:"Administrator",id:1},
    {name:"Project Manager",id:2},
    {name:"Employee",id:3}
]

let RegisterFrom = (props) => {
    var classes = useStyles();
    const { RegisterUser,  pristine, reset, submitting, handleSubmit } = props
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(RegisterUser)}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    {SectionOne({ classes ,"mainProps":props })}
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
    const { Domains, Skills }=props.mainProps.MasterDataSet
    return <div className={classes.root}>
        <div>
            {PersonalInfo({ classes, "mainProps":props.mainProps })}
            {SkillSet({ classes, Skills })}
            {Assign({ classes, Domains })}
        </div>
    </div>
}

const PersonalInfo = (props) => {
    const { classes } = props
    const { profileImageUploadMethod }=props.mainProps
    const { profileImageUpload, profileImageUrl}=props.mainProps.stateData
    console.log("PIN ",props)
    return <Accordion expanded={true}>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> PERSONAL INFORMATION</AccordionSummary>
        <AccordionDetails>
            <div>
                {(profileImageUrl === "" || profileImageUrl=== undefined) ? (profileImageUpload ? loadingCircle() 
                    : <Field name="profilePic" component={renderFileInput} fullWidth successFunction={profileImageUploadMethod} type="file"  lable="Profile Image" />) 
                : <h5>{loadFileUrlName(profileImageUrl)}</h5>}
                <Field name="designation" component={renderTextField} label="Job Title" style={{ margin: 8 }} fullWidth helperText="Ex. Java Full Stack Developer" margin="normal" InputLabelProps={{ shrink: true }} />
                <Field name="firstName" className={classes.textField} component={renderTextField} label="First Name" />
                <Field name="lastName" className={classes.textField} component={renderTextField} label="Last Name" />
                <Field name="expInYears" className={classes.textField} component={renderNumberField} label="Expriance" helperText="Ex. 2 years" margin="normal" />
                <Field name="password" className={classes.textField} component={renderTextField} label="Password" margin="normal" helperText="Password must contain [1...9][A...Z] and any special symbol" />
                <Field name="gender" className={classes.textField} component={radioButton} mainLableName="Gender" label={["male", "female"]} />
            </div>
        </AccordionDetails>
    </Accordion>
}

const loadFileUrlName=(fileUrl)=>{
    let fileArray=fileUrl.split("\\");
    return fileArray.length > 0 ? fileArray[5]: "";
  }

// this method will used for the showing progress bar
const loadingCircle = () => <center> Uploading <CircularProgress size={40} /> </center>

const SkillSet = (props) => {
    const { Skills } = props
    console.log("Skills", Skills)
    return <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> SKILLS INFORMATION</AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <Field name="primerySkill" component={renderAutocompleteByName} optionData={Skills}  label="Primary Skill" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field name="secounderySkill" component={renderAutocompleteByName} optionData={Skills} label="Secondary Skill" />
                </Grid>
            </Grid>
        </AccordionDetails>
    </Accordion>
}

const Assign = (props) => {
    const { classes, Domains } = props
    return <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content"> ASSIGN ROLES</AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <Field name="roles" component={renderAutocompleteByName} optionData={Roles}  label="Roles" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field name="domain" component={renderAutocompleteByName} optionData={Domains} label="Domain" />
                </Grid>
            </Grid>
            {/* <div>
                <Field name="roles" component={renderSelectField} className={classes.textField} margin="normal" label="Roles" >
                    {Roles.map((item, key) => <option key={key} value={item}>{item}</option>)}
                </Field>
                <Field name="domain" component={renderSelectField} className={classes.textField} margin="normal" label="Domain" >
                    {Domains.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                </Field>
            </div> */}
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

RegisterFrom = connect(state => { return { ...state } })(RegisterFrom)
const afterSubmit = (result, dispatch) => dispatch(reset('RegisterFrom'));
export default reduxForm({ form: 'RegisterFrom', onSubmitSuccess: afterSubmit })(RegisterFrom);
