import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { reset, reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import SimpleTabs from './TabPanleUtilites';
import { renderTextField, renderTextHiddenField, renderFileInput, renderSelectField, renderTextAreaField } from '../utilites/FromUtilites';
import useStyles from "../client/Styles";
import { connect } from 'react-redux';
import RateCardTable from '../rateCard/RateCardTable';
import ContactTable from '../contact/ContactTable';
import { Alert } from '@material-ui/lab';
import { Required, PhoneNumber, GSTIN, TAN, IFSCCode, BankAccount, Email } from '../utilites/FormValidation';

let ClientForm = (props) => {
    var classes = useStyles();
    const { SaveClientMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues } = props
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveClientMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}>{(initialValues === undefined) ? "SUBMIT" : "EDIT"}</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); cancle() }}> Cancel</Button>
                </center>
            </div>
        </form>
    </div>
}

const LoadGird = (props) => {
    var classes = useStyles();
    const { rateCardDtos, contactPersonDtos } = props
    const { Domains, SkillCategory, SkillSet } = props.MasterDataSet
    return <><Grid container spacing={5}>
        <Grid item style={{ paddingLeft: 30 }}>
            {HeaderPart({ classes, props })}
        </Grid>
    </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                {SectionOne({ classes, props })}
            </Grid>
            <Grid item xs={12} sm={6}>
                {SectionTwo({ classes, props })}
            </Grid>
        </Grid>
        <Grid container spacing={5} style={{ paddingLeft: 10 }}>
            <Grid item xs={12}>
                {SectionThree({ classes, rateCardDtos, contactPersonDtos, Domains, SkillCategory, SkillSet })}
            </Grid>
        </Grid>
    </>
}
// this method used for the load header part
const HeaderPart = (props) => {
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
        <Field name="id" component={renderTextHiddenField} />
        <Field name="clientName" component={renderTextField} fullWidth label="Client Name" helperText="Ex. Rigved Tech. Pvt. Ltd." validate={[Required]} />
        <Field name="tanNum" component={renderTextField} className={classes.textField} label="TAN No." helperText="Ex. PDES03028F" validate={[Required, TAN]} />
        <Field name="gstNum" component={renderTextField} className={classes.textField} label="GST No." helperText="Ex. 24AAACC1206D1ZM" validate={[Required, GSTIN]} />
    </>
}

// section two
const SectionTwo = (data) => {
    const { initialValues } = data.props
    return (initialValues === undefined) ? AddressDto(data) : AddressTextArea();
}

// this method used for the load the address into text area
const AddressTextArea = () => {
    return <Field
        name="addressDtos"
        validate={[Required]}
        format={address => address ? ("" + address.addressLine + "," + address.area + "," + address.city + ((address.state !== null) ? ("," + address.state + ",") : ",") + address.pincode) : ""}
        parse={value => JSON.parse(value)}
        component={renderTextAreaField}
        maxRows={2} label="HQ Address"
        fullWidth helperText="Ex. Sector 1, Mahape, Navi Mumbai, Maharashtra 400701" />
}
// this method used for the show the address inputs 
const AddressDto = (props) => {
    const { classes } = props
    return <>
        <Field name="addressDtos.addressLine" component={renderTextField} validate={[Required]} fullWidth label="Address Line" helperText="Ex. Sector 1" />
        <Field name="addressDtos.city" component={renderTextField} validate={[Required]} className={classes.textField} label="City" helperText="Ex. Navi Mumbai" />
        <Field name="addressDtos.area" component={renderTextField} className={classes.textField} label="Area" helperText="Ex. Mahape" />
        <Field name="addressDtos.state" component={renderTextField} validate={[Required]} className={classes.textField} label="State" helperText="Ex. Maharashtra" />
        <Field name="addressDtos.pincode" component={renderTextField} validate={[Required]} className={classes.textField} label="Pincode" helperText="Ex. 400001" />
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
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                {BankDetailsDto()}
            </Grid>
            <Grid item xs={12} sm={4}>
                <Field name="tanUrl" component={renderFileInput} validate={[Required]} style={{ padding: 10 }} type="file" lable="Choose TAN Card Image" />
                <Field name="gstUrl" component={renderFileInput} validate={[Required]} style={{ padding: 10 }} type="file" lable="Choose GST Card Image" />
            </Grid>
        </Grid>
    </>
}

const BankDetailsDto = () => {
    return <span> <Field name="bankDetailsDtoList.accountNumber" component={renderTextField} validate={[Required, BankAccount]} label="Account Number" fullWidth helperText="Ex. 3456231234567" />
        <Field name="bankDetailsDtoList.ifscCode" component={renderTextField} validate={[Required, IFSCCode]} label="IFSC Code" fullWidth helperText="Ex. SBIN0000123" />
        <Field name="bankDetailsDtoList.bankName" component={renderTextField} label="Bank Name" fullWidth helperText="Ex. State Bank of India" />
        <Field name="bankDetailsDtoList.branchName" component={renderTextField} label="Branch Name" fullWidth helperText="Ex. Mumbai" />
    </span>
}

// this will be render contact
const RenderContact = ({ classes, fields, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
        fields.push({})
    };
    const handleClose = () => { setOpen(false) };
    return <span>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>
        <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title" >
            <DialogTitle id="responsive-dialog-title">{"Add Contact"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {fields.map((member, index) => (
                        <tr key={index}>
                            <td><Field name={`${member}.name`} component={renderTextField} validate={[Required]} className={classes.textField} label="Name" helperText="Ex. admin" /></td>
                            <td><Field name={`${member}.email`} component={renderTextField} validate={[Required, Email]} className={classes.textField1} label="Email" helperText="Ex. admin@rigvedtech.com" /></td>
                            <td><Field name={`${member}.mobileNum`} component={renderTextField} validate={[Required, PhoneNumber]} className={classes.textField1} label="Mobile Number" helperText="Ex. 9130253456" /></td>
                            <td><Field name={`${member}.role`} component={renderTextField} className={classes.textField1} label="Job Designation" helperText="Ex. Developer" /></td>
                            <td><Button type="button" variant="contained" color="secondary" onClick={() => fields.remove(index)}> Remove</Button></td>
                        </tr>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>Cancel</Button>
                <Button onClick={handleClose} color="secondary" autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    </span>
}

// this will be render rate card
const RenderRateCard = ({ classes, domains, skillCategory, skillSet, fields, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
        fields.push({})
    };
    const handleClose = () => { setOpen(false) };
    return <span>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>
        <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title" >
            <DialogTitle id="responsive-dialog-title">{"Adding Rate Card"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {fields.map((member, index) => (
                        <tr key={index} className={classes.selectContainer}>
                            <td>
                                <Field name={`${member}.domainName`} className={classes.selectTextField} component={renderSelectField} validate={[Required]} label="Domain" >
                                    {(domains && domains.length > 0) && domains.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillCategory`} className={classes.selectTextField} component={renderSelectField} validate={[Required]} label="Category" >
                                    {(skillCategory && skillCategory.length > 0) && skillCategory.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillSet`} className={classes.selectTextField} component={renderSelectField} validate={[Required]} label="Skills" >
                                    {(skillSet && skillSet.length > 0) && skillSet.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.fromYearOfExp`} className={classes.selectTextField} component={renderSelectField} validate={[Required]} label="From" >
                                    {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.toYearOfExp`} className={classes.selectTextField} component={renderSelectField} validate={[Required]} label="To" >
                                    {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
                                </Field>
                            </td>
                            <td><Field name={`${member}.rate`} type="text" className={classes.selectTextField} component={renderTextField} label="Rate" /></td>
                            <td><Button type="button" variant="contained" color="secondary" onClick={() => fields.remove(index)}> Remove</Button></td>
                        </tr>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>Cancel</Button>
                <Button onClick={handleClose} color="secondary" autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    </span>
}

// rate card
const RateCard = (props) => {
    const { rateCardDtos, Domains, SkillCategory, SkillSet, classes } = props
    return <span>
        <FieldArray name="rateCardDtos" classes={classes} domains={Domains} skillCategory={SkillCategory} skillSet={SkillSet} component={RenderRateCard} validate={[Required]} />
        <RateCardTable data={rateCardDtos} />
    </span>
}

// contact address
const ContactAddress = (props) => {
    const { contactPersonDtos, classes } = props
    return <span>
        <FieldArray name="contactPersonDtos" classes={classes} component={RenderContact} validate={[Required]} />
        <ContactTable data={contactPersonDtos} />
    </span>
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
export default reduxForm({ form: 'ClientForm', onSubmitSuccess: afterSubmit })(ClientForm);
