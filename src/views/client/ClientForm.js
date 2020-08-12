import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel, CircularProgress } from '@material-ui/core';
import { reset, reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import SimpleTabs from './TabPanleUtilites';
import { renderTextField, renderTextHiddenField, renderFileInput, renderSelectField, renderTextAreaField, renderAutocompleteByName } from '../utilites/FromUtilites';
import useStyles from "../client/Styles";
import { connect } from 'react-redux';
import RateCardTable from '../rateCard/RateCardTable';
import ContactTable from '../contact/ContactTable';
import { Alert } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Required, PhoneNumber, GSTIN, TAN, IFSCCode, BankAccount, Email } from '../utilites/FormValidation';
import * as FileActions from "../../redux/actions/FileAction";
import { FromActions } from '../../assets/config/Config';

let ClientForm = (props) => {
    var classes = useStyles();
    const { SaveClientMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues, clearFile } = props
    const { operation } = props.stateData
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveClientMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    {(operation === FromActions.ED || operation === FromActions.CR) && <>
                        <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> {(initialValues === undefined) ? "SUBMIT" : "EDIT"}</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button></>}&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => { await clearFile(); await reset(); cancle() }}> Cancel</Button>
                </center>
            </div>
        </form>
    </div>
}

const LoadGird = (props) => {
    var classes = useStyles();
    const { rateCardDtos, contactPersonDtos, initialValues } = props
    const { Domains, SkillCategory, SkillSet } = props.MasterDataSet
    return <><Grid container spacing={5}>
        <Grid item style={{ paddingLeft: 30 }}>
            {HeaderPart({ classes, initialValues, props })}
        </Grid>
    </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                {(initialValues === undefined) ? SectionOne({ classes, "mainProps":props }) : EditSectionOne({ classes, initialValues })}
            </Grid>
            <Grid item xs={12} sm={6}>
                {SectionTwo({ classes,"mainProps":props })}
            </Grid>
        </Grid>
        <Grid container spacing={5} style={{ paddingLeft: 10 }}>
            <Grid item xs={12}>
                {SectionThree({ classes, rateCardDtos, contactPersonDtos, Domains, SkillCategory, SkillSet,"mainProps":props })}
            </Grid>
        </Grid>
    </>
}
// this method used for the load header part
const HeaderPart = (props) => {
    const { initialValues } = props
    const { color, common_message } = props.props.ClientState
    return <Grid item container direction="row" justify="center" alignItems="center" >
        {(initialValues !== undefined) && <h2>{initialValues.clientName}</h2>}
        <center>{common_message && <Alert color={color} >{common_message}</Alert>}</center>
    </Grid>
}

// section one
const SectionOne = (data) => {
    const { classes } = data
    return <div>
        <Field name="id" component={renderTextHiddenField} />
        <Field name="clientName" component={renderTextField} fullWidth label="Client Name" helperText="Ex. Rigved Tech. Pvt. Ltd." validate={[Required]} />
        <Field name="tanNum" component={renderTextField} className={classes.textField} label="TAN No." helperText="Ex. PDES03028F" validate={[Required, TAN]} />
        <Field name="gstNum" component={renderTextField} className={classes.textField} label="GST No." helperText="Ex. 24AAACC1206D1ZM" validate={[Required, GSTIN]} />
    </div>
}

// section one
const EditSectionOne = (data) => {
    const { initialValues } = data
    return <div>
        <Field name="id" component={renderTextHiddenField} />
        <Field name="clientName" component={renderTextHiddenField} validate={[Required]} />
        <Field name="tanNum" component={renderTextHiddenField} />
        <Field name="gstNum" component={renderTextHiddenField} />
        <FormLabel component="legend">GST Number :{initialValues.gstNum}</FormLabel><br />
        <FormLabel component="legend">TAN Number :{initialValues.tanNum}</FormLabel>
    </div>
}

// section two
const SectionTwo = (data) => {
    const { initialValues } = data.mainProps
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
        fullWidth 
        disabled
        />
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
const SectionThree = (data) => {
    const tabsData = [
        { label: "Contact Person", component: ContactAddress(data) },
        { label: "Financials", component: Financials(data.mainProps) },
        { label: "Rate Card", component: RateCard(data) }
    ]
    return <SimpleTabs tabData={tabsData} />
}


// financials tab
const Financials = (data) => {
    const { gstFileUpload, tanFileUpload, initialValues } = data
    const { gstFileUrl, tanFileUrl, gstUpload, tanUpload } = data.stateData
    return <>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                {BankDetailsDto()}
            </Grid>
            <Grid item xs={12} sm={4}>
                <Grid item xs={12}>
                    {((gstFileUrl === "" || gstFileUrl === undefined) && initialValues === undefined) ? (gstUpload ? loadingCircle() : <Field name="gstUrl" component={renderFileInput} type="file" successFunction={gstFileUpload} validate={[Required]} lable="GST Card Image" />)
                        : <>{initialValues === undefined ?(<h5>GST File: {LoadFileUrlName(gstFileUrl)}</h5>)
                            : LoadFileUrl({ "url": initialValues.gstUrl, "cid": initialValues.id, "props": data, "componentName": "GST Image" })} </>
                    }
                </Grid>
                <Grid item xs={12}>
                    {((tanFileUrl === "" || tanFileUrl === undefined) && initialValues === undefined) ? (tanUpload ? loadingCircle() : <Field name="gstUrl" component={renderFileInput} type="file" successFunction={tanFileUpload} validate={[Required]} lable="TAN Card Image" />)
                        : <>{initialValues === undefined ? (<h5>TAN File: {LoadFileUrlName(tanFileUrl)}</h5>)
                            : LoadFileUrl({ "url": initialValues.tanUrl, "cid": initialValues.id, "props": data, "componentName": "TAN Image" })} </>
                    }
                </Grid>
            </Grid>
        </Grid>
    </>
}

const LoadFileUrlName = (fileUrl) => {
    let fileArray = fileUrl.split("\\");
    return fileArray.length > 0 ? fileArray[5] : "";
}


let LoadFileUrl = (parameter) => {
    const { listOfFiles } = parameter.props.FileState
    const exitsData = (listOfFiles.length > 0) && listOfFiles.filter(x => (x.cid === parameter.cid && x.fileName === parameter.url));
    if (exitsData === false || exitsData.length <= 0) { GetPhotos(parameter) }
    return <>{parameter.componentName}:<img src={exitsData.length > 0 && exitsData[0].fileData} alt={parameter.componentName} style={{ height: "50%", width: "70%" }} /></>;
}

const GetPhotos = async (parameter) => {
    const { FetchPhoto } = parameter.props
    const { authorization } = parameter.props.LoginState
    return await FetchPhoto(parameter.url, authorization, parameter.cid);
}

// this method will used for the showing progress bar
const loadingCircle = () => <center> Uploading <CircularProgress size={40} /> </center>

// this will be load the bank details related fields
const BankDetailsDto = () => {
    return <span> <Field name="bankDetailsDtoList.accountNumber" component={renderTextField} validate={[Required, BankAccount]} label="Account Number" fullWidth helperText="Ex. 3456231234567" />
        <Field name="bankDetailsDtoList.ifscCode" component={renderTextField} validate={[Required, IFSCCode]} label="IFSC Code" fullWidth helperText="Ex. SBIN0000123" />
        <Field name="bankDetailsDtoList.bankName" component={renderTextField} label="Bank Name" fullWidth helperText="Ex. State Bank of India" />
        <Field name="bankDetailsDtoList.branchName" component={renderTextField} label="Branch Name" fullWidth helperText="Ex. Mumbai" />
    </span>
}

// this will be render contact
const RenderContact = ({ classes, fields,operation, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); fields.push({}) };
    const handleClose = () => { setOpen(false) };
    return <span>
        { (operation !== FromActions.VI )&&<Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>}
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaper }} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title" >
            <DialogTitle id="responsive-dialog-title-1">{"Add Contact"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {fields.map((member, index) => (
                        <tr key={index}>
                            <td><Field name={`${member}.name`} component={renderTextField} validate={[Required]} className={classes.textField} label="Name" helperText="Ex. admin" /></td>
                            <td><Field name={`${member}.email`} component={renderTextField} validate={[Required, Email]} className={classes.textField1} label="Email" helperText="Ex. admin@rigvedtech.com" /></td>
                            <td><Field name={`${member}.mobileNum`} component={renderTextField} validate={[Required, PhoneNumber]} className={classes.textField1} label="Mobile Number" helperText="Ex. 9130253456" /></td>
                            <td><Field name={`${member}.role`} component={renderTextField} className={classes.textField1} label="Job Designation" helperText="Ex. Developer" /></td>
                            <td><DeleteOutlineIcon variant="contained" color="secondary" onClick={() => fields.remove(index)} /></td>
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
const RenderRateCard = ({ classes, domains, skillCategory, skillSet, fields, operation, meta: { error, submitFailed } }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true); fields.push({}); };
    const handleClose = () => { setOpen(false) };
    return <span>
        {(operation !== FromActions.VI)&&<Button style={{ float: "Right" }} variant="contained" color="primary" onClick={handleClickOpen}>ADD</Button>}
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaper }} aria-describedby="alert-dialog-description" aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title-2">{"Adding Rate Card"}</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    {fields.map((member, index) => (
                        <Grid container spacing={5}>
                            <Grid item >
                                <Field name={`${member}.domainName`} component={renderAutocompleteByName} optionData={domains} validate={[Required]} label="Domain" />
                            </Grid>
                            <Grid item >
                                <Field name={`${member}.skillCategory`} component={renderAutocompleteByName} optionData={skillCategory} validate={[Required]} label="Category" />
                            </Grid>
                            <Grid item >
                                <Field name={`${member}.skillSet`} className={classes.selectTextField} component={renderAutocompleteByName} optionData={skillSet} validate={[Required]} label="Skills" />
                            </Grid>
                            <Grid item >
                                <Field name={`${member}.fromYearOfExp`} style={{ marginTop: "17px" }} component={renderSelectField} validate={[Required]} label="From" >
                                    {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
                                </Field>
                            </Grid>
                            <Grid item >
                                <Field name={`${member}.toYearOfExp`} style={{ marginTop: "17px" }} component={renderSelectField} validate={[Required]} label="To" >
                                    {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
                                </Field>
                            </Grid>
                            <Grid item >
                                <Field name={`${member}.rate`} type="text"  style={{ marginTop: "17px" }} component={renderTextField} label="Rate" />
                            </Grid>
                            <Grid item >
                                <DeleteOutlineIcon variant="contained" color="secondary" style={{ marginTop: "17px"}} onClick={() => fields.remove(index)} />
                            </Grid>
                        </Grid>
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
const RateCard = (data) => {
    const { rateCardDtos, Domains, SkillCategory, SkillSet, classes } = data
    const { operation }=(data.mainProps && data.mainProps.stateData) ? data.mainProps.stateData : ""
    return <span>
        <FieldArray name="rateCardDtos"
            classes={classes} 
            domains={Domains} 
            skillCategory={SkillCategory} 
            skillSet={SkillSet} 
            component={RenderRateCard} 
            validate={[Required]}
            operation={operation}/>
        <RateCardTable data={rateCardDtos} />
    </span>
}

// contact address
const ContactAddress = (data) => {
    const { contactPersonDtos, classes } = data
    const { operation }=(data.mainProps && data.mainProps.stateData) ? data.mainProps.stateData : ""
    return <span>
        <FieldArray name="contactPersonDtos" 
            classes={classes} 
            component={RenderContact} 
            validate={[Required]} 
            operation={operation}/>
        <ContactTable data={contactPersonDtos}  />
    </span>
}

const validate=(values)=>{
    const errors={}
    console.log("Validate ",values)
    return errors;
}

// make the selector 
const selector = formValueSelector('ClientForm')
ClientForm = connect(state => {
    // can select values individually
    const rateCardDtos = selector(state, 'rateCardDtos')
    const contactPersonDtos = selector(state, 'contactPersonDtos')
    return { rateCardDtos, contactPersonDtos, ...state }
}, FileActions)(ClientForm)

const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm',validate, onSubmitSuccess: afterSubmit })(ClientForm);
