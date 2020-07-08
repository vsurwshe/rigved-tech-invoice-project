import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { reset, reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import SimpleTabs from './TabPanleUtilites';
import { renderTextField, renderTextAreaField, renderFileInput, renderSelectField } from '../utilites/FromUtilites';
import useStyles from "../client/Styles";
import { connect } from 'react-redux';
import RateCardTable from '../rateCard/RateCardTable';

let ClientForm = (props) => {
    var classes = useStyles();
    const { SaveClient, pristine, reset, submitting, rateCardDtos, handleSubmit, cancle } = props
    const { Domains, SkillCategory, SkillSet}= props.MasterDataSet
    console.log(props.MasterDataSet)
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveClient)}>
            <Grid container spacing={5}>
                <Grid item style={{ paddingLeft: 30 }}>
                    {Profile({ classes })}
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                    {SectionOne({ classes })}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {SectionTwo({ classes })}
                </Grid>
            </Grid>
            <Grid container spacing={5} style={{ paddingLeft: 10 }}>
                <Grid item >
                    {SectionThree({ classes, rateCardDtos, Domains, SkillCategory, SkillSet })}
                </Grid>
            </Grid>
            <div className={classes.buttonStyle}>
                <center>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> Submit </Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={cancle}> Cancle</Button>
                </center>
            </div>
        </form>
    </div>
}

const Profile = (props) => {
    return <Grid item container direction="row" justify="center" alignItems="center" >
        <div>Company Logo</div> &nbsp; &nbsp;&nbsp;
        <h3> Rigved Technologies</h3>
    </Grid>
}

// section one
const SectionOne = (props) => {
    const { classes } = props
    return <>
        <Field name="address" component={renderTextAreaField} maxRows={2} label="HQ Address" fullWidth helperText="Ex. Sector 1, Mahape, Navi Mumbai, Maharashtra 400701" />
        <Field name="tanNo" component={renderTextField} fullWidth label="TAN No." helperText="Ex. PDES03028F" />
        <Field name="tanUrl" component={renderFileInput} className={classes.textField} type="file" lable="Choose TAN Card Image" />
        <Field name="gstNo" component={renderTextField} fullWidth label="GST No." helperText="Ex. 24AAACC1206D1ZM" />
        <Field name="gstUrl" component={renderFileInput} className={classes.textField} type="file" lable="Choose GST Card Image" />
    </>
}

// section two
const SectionTwo = (props) => {
    return <>
        <Field name="phone" component={renderTextField} label="Phone" fullWidth helperText="Ex. 8709653423" />
        <Field name="mobile" component={renderTextField} label="Mobile" fullWidth helperText="Ex. 7834652312" />
        <Field name="email" component={renderTextField} label="Email" fullWidth helperText="Ex. admin@rigvedtech.com" />
    </>
}

const ContactInfo = (props) => {
    return <>
        <Field name="clientPhone" component={renderTextField} label="Phone" fullWidth helperText="Ex. 8709653423" />
        <Field name="clientMobile" component={renderTextField} label="Mobile" fullWidth helperText="Ex. 7834652312" />
        <Field name="clientEmail" component={renderTextField} label="Email" fullWidth helperText="Ex. admin@rigvedtech.com" />
    </>
}

// section three
const SectionThree = (props) => {
    const tabsData = [
        { label: "Contact & Address", component: ContactAddress() },
        { label: "Financials", component: Financials() },
        { label: "Rate Card", component: RateCard(props) }
    ]
    return <SimpleTabs tabData={tabsData} />
}

// contact address
const ContactAddress = (props) => {
    return ContactInfo(props)
}

// financials
const Financials = (props) => {
    return <>
        <Field name="accNumber" component={renderTextField} label="Account Number" fullWidth helperText="Ex. 3456231234567" />
        <Field name="ifscCode" component={renderTextField} label="IFSC Code" fullWidth helperText="Ex. SBI0000345" />
        <Field name="bankName" component={renderTextField} label="Bank Name" fullWidth helperText="Ex. State Bank of India" />
        <Field name="branchName" component={renderTextField} label="Branch Name" fullWidth helperText="Ex. Mumbai" />
    </>
}

const RenderMembers = ({ classes, domains, skillCategory, skillSet, fields, meta: { error, submitFailed } }) => {
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
                                    {(domains && domains.length >0) && domains.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillCategory`} className={classes.selectTextField} component={renderSelectField} label="Category" >
                                    {(skillCategory && skillCategory.length >0) && skillCategory.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.skillSet`} className={classes.selectTextField} component={renderSelectField} label="Skills" >
                                    {(skillSet && skillSet.length >0) && skillSet.map((item, key) => <option key={key} value={item.name}>{item.name}</option>)}
                                </Field>
                            </td>
                            <td><Field name={`${member}.yearOfExp`} type="text" className={classes.selectTextField} component={renderTextField} label="Experience" /></td>
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
    const { rateCardDtos,  Domains, SkillCategory, SkillSet, classes } = props
    return <>
        <FieldArray name="rateCardDtos" classes={classes} domains={Domains}  skillCategory={SkillCategory} skillSet={SkillSet}  component={RenderMembers} />
        <RateCardTable data={rateCardDtos} />
    </>
}

// make the selector 
const selector = formValueSelector('ClientForm')
ClientForm = connect(state => {
    // can select values individually
    const rateCardDtos = selector(state, 'rateCardDtos')
    return { rateCardDtos, ...state }
})(ClientForm)

const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm', onSubmitSuccess: afterSubmit })(ClientForm);
