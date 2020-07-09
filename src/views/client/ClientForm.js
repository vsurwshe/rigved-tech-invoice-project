import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { reset, reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import SimpleTabs from './TabPanleUtilites';
import { renderTextField, renderFileInput, renderSelectField, renderNumberField } from '../utilites/FromUtilites';
import useStyles from "../client/Styles";
import { connect } from 'react-redux';
import RateCardTable from '../rateCard/RateCardTable';
import ContactTable from '../contact/ContactTable';
import { Alert } from '@material-ui/lab';

let ClientForm = (props) => {
    var classes = useStyles();
    const { SaveClientMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues } = props
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveClientMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    {(initialValues === undefined) && <>
                        <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> Submit </Button> &nbsp;&nbsp;
                        <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button> &nbsp;&nbsp;
                    </>}
                    <Button type="button" variant="outlined" color="secondary" onClick={cancle}> Cancel</Button>
                </center>
            </div>
        </form>
    </div>
}

const LoadGird=(props)=>{
    var classes = useStyles();
    const { rateCardDtos, contactPersonDtos } = props
    const { Domains, SkillCategory, SkillSet } = props.MasterDataSet
return    <><Grid container spacing={5}>
                <Grid item style={{ paddingLeft: 30 }}>
                    {Profile({ classes, props })}
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                    {SectionOne({ classes, props })}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {SectionTwo({ classes })}
                </Grid>
            </Grid>
            <Grid container spacing={5} style={{ paddingLeft: 10 }}>
                <Grid item xs={12}>
                    {SectionThree({ classes, rateCardDtos, contactPersonDtos, Domains, SkillCategory, SkillSet })}
                </Grid>
            </Grid></>

}

const Profile = (props) => {
    const { color, common_message } = props.props.ClientState
    return <Grid item container direction="row" justify="center" alignItems="center" >
        <div>Company Logo</div> &nbsp; &nbsp;&nbsp;
        <h3> Rigved Technologies</h3>
        <center>{common_message && <Alert color={color} >{common_message}</Alert>}</center>
    </Grid>
}

// section one
const SectionOne = (data) => {
    const { classes } = data
    return <>
        {/* <Field name="address" component={renderTextAreaField} maxRows={2} label="HQ Address" fullWidth helperText="Ex. Sector 1, Mahape, Navi Mumbai, Maharashtra 400701" /> */}
        <Field name="clientName" value="Vishva" component={renderTextField} fullWidth label="Client Name" helperText="Ex. Rigved Tech. Pvt. Ltd." />
        <Field name="tanNum" component={renderTextField} className={classes.textField} label="TAN No." helperText="Ex. PDES03028F" />
        <Field name="gstNum" component={renderTextField} className={classes.textField} label="GST No." helperText="Ex. 24AAACC1206D1ZM" />
        <Field name="tanUrl" component={renderFileInput} style={{ padding: 10 }} type="file" lable="Choose TAN Card Image" />
        <Field name="gstUrl" component={renderFileInput} style={{ padding: 10 }} type="file" lable="Choose GST Card Image" />
    </>
}

const AddressDto = (props) => {
    const { classes } = props
    return <>
        <Field name="addressDtos.addressLine" component={renderTextField} fullWidth label="Address Line" helperText="Ex. Sector 1" />
        <Field name="addressDtos.city" component={renderTextField} className={classes.textField} label="City" helperText="Ex. Navi Mumbai" />
        <Field name="addressDtos.area" component={renderTextField} className={classes.textField} label="Area" helperText="Ex. Mahape" />
        <Field name="addressDtos.state" component={renderTextField} className={classes.textField} label="State" helperText="Ex. Maharashtra" />
        <Field name="addressDtos.pincode" component={renderTextField} className={classes.textField} label="Pincode" helperText="Ex. 400001" />
    </>
}

// section two
const SectionTwo = (props) => {
    return <>
        {AddressDto(props)}
    </>
}

// section three
const SectionThree = (props) => {
    const tabsData = [
        { label: "Contact Person", component: ContactAddress(props) },
        { label: "Financials", component: Financials() },
        { label: "Rate Card", component: RateCard(props) }
    ]
    return <SimpleTabs tabData={tabsData} />
}


// financials
const Financials = (props) => {
    return <>
        <Field name="bankDetailsDtoList.accountNumber" component={renderTextField} label="Account Number" fullWidth helperText="Ex. 3456231234567" />
        <Field name="bankDetailsDtoList.ifscCode" component={renderTextField} label="IFSC Code" fullWidth helperText="Ex. SBI0000345" />
        <Field name="bankDetailsDtoList.bankName" component={renderTextField} label="Bank Name" fullWidth helperText="Ex. State Bank of India" />
        <Field name="bankDetailsDtoList.branchName" component={renderTextField} label="Branch Name" fullWidth helperText="Ex. Mumbai" />
    </>
}

// this will be render contact
const RenderContact = ({ classes, fields, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
        fields.push({})
    };
    const handleClose = () => { setOpen(false) };
    return <>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>
        <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title" >
            <DialogTitle id="responsive-dialog-title">{"Add Contact"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {fields.map((member, index) => (
                        <tr key={index}>
                            <td><Field name={`${member}.name`} component={renderTextField} className={classes.textField} label="Name" helperText="Ex. admin" /></td>
                            <td><Field name={`${member}.email`} component={renderTextField} className={classes.textField1} label="Email" helperText="Ex. admin@rigvedtech.com" /></td>
                            <td><Field name={`${member}.mobileNum`} component={renderTextField} className={classes.textField1} label="Mobile Number" helperText="Ex. 9130253456" /></td>
                            <td><Field name={`${member}.jobDesc`} component={renderTextField} className={classes.textField1} label="Job Description" helperText="Ex. Developer" /></td>
                            <td><Button type="button" variant="contained" color="secondary" onClick={() => fields.remove(index)}> Remove</Button></td>
                        </tr>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus> Cancel   </Button>
                <Button onClick={handleClose} color="primary" autoFocus> Save  </Button>
            </DialogActions>
        </Dialog>
    </>
}

// this will be render rate card
const RenderRateCard = ({ classes, domains, skillCategory, skillSet, fields, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
        fields.push({})
    };
    const handleClose = () => { setOpen(false) };
    return <>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>
        <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title" >
            <DialogTitle id="responsive-dialog-title">{"Adding Rate Card"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {fields.map((member, index) => (
                        <tr key={index} className={classes.selectContainer}>
                            <td>
                                <Field name={`${member}.domainName`} className={classes.selectTextField} component={renderSelectField} label="Domain" >
                                    {(domains && domains.length > 0) && domains.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillCategory`} className={classes.selectTextField} component={renderSelectField} label="Category" >
                                    {(skillCategory && skillCategory.length > 0) && skillCategory.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillSet`} className={classes.selectTextField} component={renderSelectField} label="Skills" >
                                    {(skillSet && skillSet.length > 0) && skillSet.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td><Field name={`${member}.yearOfExp`} className={classes.selectTextField} component={renderNumberField} label="Experience" /></td>
                            <td><Field name={`${member}.rate`} type="text" className={classes.selectTextField} component={renderTextField} label="Rate" /></td>
                            <td><Button type="button" variant="contained" color="secondary" onClick={() => fields.remove(index)}> Remove</Button></td>
                        </tr>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus> Cancle   </Button>
                <Button onClick={handleClose} color="primary" autoFocus> Save  </Button>
            </DialogActions>
        </Dialog>
    </>
}

// rate card
const RateCard = (props) => {
    const { rateCardDtos, Domains, SkillCategory, SkillSet, classes } = props
    return <>
        <FieldArray name="rateCardDtos" classes={classes} domains={Domains} skillCategory={SkillCategory} skillSet={SkillSet} component={RenderRateCard} />
        <RateCardTable data={rateCardDtos} />
    </>
}


// contact address
const ContactAddress = (props) => {
    const { contactPersonDtos, classes } = props
    return <>
        <FieldArray name="contactPersonDtos" classes={classes} component={RenderContact} />
        <ContactTable data={contactPersonDtos} />
    </>
}

// make the selector 
const selector = formValueSelector('ClientForm')
ClientForm = connect(state => {
    // can select values individually
    const rateCardDtos = selector(state, 'rateCardDtos')
    const contactPersonDtos = selector(state, 'contactPersonDtos')
    return { rateCardDtos, contactPersonDtos, ...state }
})(ClientForm)

const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm', 
// onSubmitSuccess: afterSubmit 
})(ClientForm);
