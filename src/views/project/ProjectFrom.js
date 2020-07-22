import React from 'react';
import { reset, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import useStyles from "../client/Styles";
import { renderTextField, renderDateTimePicker, renderFileInput, renderAutocomplete } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import { FromActions } from '../../assets/config/Config';


let ProjectForm = (props) => {
    var classes = useStyles();
    const { SaveMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues} = props
    const { operation }= props.stateData
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    {(operation === FromActions.CR || operation === FromActions.ED) && <>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> {(initialValues === undefined) ? "SUBMIT" : "EDIT"}</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button></>}&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); cancle() }}> Cancel</Button>
                </center>
            </div>
        </form>
    </div>
}

const LoadGird = (props) => {
    var classes = useStyles();
    const { initialValues } =props
    return <><Grid container spacing={5}>
    </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30, paddingTop:20 }}>
                {SectionOne({ classes, props, initialValues })}
            </Grid>
            <Grid item xs={12} sm={6} style={{paddingTop:50}}>
                {SectionTwo({ classes, props, initialValues })}
            </Grid>
        </Grid>
        <Grid container spacing={5} style={{ paddingLeft: 10, paddingTop:20 }}>
            <Grid item xs={12}>
                {(initialValues !== undefined) && SectionThree({ classes })} 
            </Grid>
        </Grid>
    </>
}


const SectionOne = (data) => {
    const { classes, initialValues } = data
    const { operation }= data.props.stateData
    return <> {operation === FromActions.CR ? LoadFields({classes, "mainProps":data.props}) : LoadHeader({classes, initialValues}) }</>
}

const LoadFields=(parameter)=>{
    const { classes }=parameter
    const { listOfClient }=parameter.mainProps.ClientState
    const { ManagerList }=parameter.mainProps.MasterDataSet
    const { purchaseOrderList }=parameter.mainProps.PurchaseOrderState
    let projectManagerOptions= ManagerList.length >0 && ManagerList.map((item,key)=>{
        return {title:item.firstName+" "+item.lastName,id:item.accountId}
    }) 
    let clientOptions= listOfClient.length >0 && listOfClient.map((item,key)=>{
        return {title:item.clientName,id:item.id}
    })
    let purchaseOrderOptions= purchaseOrderList.length >0 && purchaseOrderList.map((item,key)=>{
        return {title:item.poNum,id:item.id}
    })
    console.log("Data PF ",parameter, projectManagerOptions, clientOptions, purchaseOrderOptions)
    return <> 
        <Field name="projectName" component={renderTextField} fullWidth label="Project Name" helperText="Ex. PRMS" validate={[Required]} />
        <Field name="clientName" component={renderAutocomplete} optionData={clientOptions}  label="Client Name" validate={[Required]} /> 
        <Field name="projectManager" component={renderAutocomplete} optionData={projectManagerOptions} label="Project Manager Name" validate={[Required]} /> 
        <Field name="purchaseOrder" component={renderAutocomplete} optionData={purchaseOrderOptions} label="Purchase Order Number (Current)" />
        <Button color="secondary" variant="contained">View PO</Button>
    </>
}

const LoadHeader=(parameter)=>{
    const { classes, initialValues }=parameter
    return <>
        <h2 className={classes.textField}>{initialValues.clientName}</h2>
    </>
}

const SectionTwo = (data) => {
    const { classes } = data
    // const { operation }= data.props.stateData
    return <>
        <Field name="projectStartDate" component={renderDateTimePicker} className={classes.textField} label="Start Date" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="projectEndDate" component={renderDateTimePicker} className={classes.textField} label="End Date" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="contractAttachmentUrl" component={renderFileInput} fullWidth helperText="" type="file" lable="Project File" />
    </>
}

const SectionThree = (props) => {
    // const { classes } = props
    return <>
        <h1>PDF Viewer</h1>
    </>

}

// make the selector 
// const selector = formValueSelector('PurchaseOrderForm')
ProjectForm = connect(state => { return { ...state } })(ProjectForm)

const afterSubmit = (result, dispatch) => dispatch(reset('ProjectForm'));
export default reduxForm({ form: 'ProjectForm', 
// onSubmitSuccess: afterSubmit 
})(ProjectForm);

