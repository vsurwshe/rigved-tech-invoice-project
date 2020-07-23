import React from 'react';
import { reset, reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import useStyles from "../client/Styles";
import { renderTextField, renderDateTimePicker, renderFileInput, renderAutocomplete, renderNumberField, renderTextAreaField } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import { FromActions } from '../../assets/config/Config';
import SimpleTabs from '../client/TabPanleUtilites';
import * as FileAction from '../../redux/actions/FileAction'


let ProjectForm = (props) => {
    var classes = useStyles();
    const { SaveMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues,clearFile} = props
    const { operation }= props.stateData
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    {(operation === FromActions.CR || operation === FromActions.ED) && <>
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
    const { purchaseOrder }=parameter.mainProps
    const { listOfClient }=parameter.mainProps.ClientState
    const { ManagerList,Domains }=parameter.mainProps.MasterDataSet
    const { purchaseOrderList }=parameter.mainProps.PurchaseOrderState
    let projectManagerOptions= ManagerList.length >0 && ManagerList.map((item,key)=>{
        return {title:item.firstName+" "+item.lastName,id:item.accountId}
    }) 
    let clientOptions= listOfClient.length >0 && listOfClient.map((item,key)=>{
        return {title:item.clientName ? item.clientName: "",id:item.id}
    })
    let purchaseOrderOptions= purchaseOrderList.length >0 && purchaseOrderList.map((item,key)=>{
        return {title:item.poNum ? item.poNum: "",id:item.id}
    })
    let projectTypeOptions= Domains.length >0 && Domains.map((item,key)=>{
        return {title:item.name ? item.name: "",id:item.id}
    })
    console.log("Data PF ",parameter, parameter.mainProps)
    return <> 
        <Field name="projectName" component={renderTextField} fullWidth label="Project Name" helperText="Ex. PRMS" validate={[Required]} />
        <Field name="projectType" component={renderAutocomplete} optionData={projectTypeOptions} label="Project Type" validate={[Required]} />
        <Field name="clientName" component={renderAutocomplete} optionData={clientOptions}  label="Client Name" validate={[Required]} /> 
        <Field name="projectManager" component={renderAutocomplete} optionData={projectManagerOptions} label="Project Manager Name" validate={[Required]} /> 
        <Field name="purchaseOrder" component={renderAutocomplete} optionData={purchaseOrderOptions} label="Purchase Order Number (Current)" />
        {purchaseOrder && <Button color="secondary" variant="contained">View PO</Button>}
    </>
}

const LoadHeader=(parameter)=>{
    const { classes, initialValues }=parameter
    return <>
        <h2 className={classes.textField}>{initialValues.projectName}</h2>
        <h4 className={classes.textField}>Client Name :{initialValues.clientName}</h4>
        <h4 className={classes.textField}>Project Manager :{initialValues.projectManager}</h4>
        <h4 className={classes.textField}>Purchase Order :{initialValues.purchaseOrder}</h4>

    </>
}

const SectionTwo = (data) => {
    const { classes } = data
    const { uploadFile } = data.props
    const { operation, projectContractFileUrl, projectContractFileUpload }= data.props.stateData
    return <>
        <Field name="projectStartDate" component={renderDateTimePicker} className={classes.textField} label="Start Date" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="projectEndDate" component={renderDateTimePicker} className={classes.textField} label="End Date" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="projectCost" component={renderNumberField} className={classes.textField} label="Project Cost" helperText="Ex. 20000" validate={[Required]} />
        <Field name="projectDesc" component={renderTextAreaField} maxRows={2} label="Project Description" fullWidth />
        {operation === FromActions.CR &&
            <>{(projectContractFileUpload) ? loadingCircle()
                : (projectContractFileUrl ? LoadFileUrl({ "url": projectContractFileUrl, "cid": 1, "props": data, "componentName": "Purchase Order Image", "style": { height: "60%", width: "100%" } })
                    : <Field name="contractAttachmentUrl" component={renderFileInput} fullWidth type="file" successFunction={uploadFile} lable="Project File" />)
            }</>
        }
    </>
}

// this method used for the showing image
let LoadFileUrl = (parameter) => {
    const { listOfFiles } = parameter.props.props.FileState
    const exitsData = (listOfFiles.length > 0) && listOfFiles.filter(x => (x.cid === parameter.cid && x.fileName === parameter.url));
    if (exitsData === false || exitsData.length <= 0) { GetPhotos(parameter) }
    return <iframe title="ProjectContractFileUrl" type="application/pdf" src={exitsData.length > 0 && exitsData[0].fileData}  style={parameter.style} />
}

// this method used for the load the image form api
const GetPhotos = async (parameter) => {
    const { FetchPhoto } = parameter.props.props
    const { authorization } = parameter.props.props.LoginState
    return await FetchPhoto(parameter.url, authorization, parameter.cid,"application/pdf");
}

// this method will used for the loading circule progress bar
const loadingCircle = () => <center> Uploading <CircularProgress size={40} /> </center>


const SectionThree = (props) => {
    const tabsData = [
        { label: "Contact Person", component: Resources(props) },
        { label: "Financials", component: Expenses(props) },
    ]
    return <SimpleTabs tabData={tabsData} />

}

const Resources=(data)=>{
    return <h1> Resources</h1>
}

const Expenses=(data)=>{
    return <h1> Expenses</h1>
}

// make the selector 
const selector = formValueSelector('ProjectForm')
ProjectForm = connect(state => { 
    // can select values individually
    const purchaseOrder = selector(state, 'purchaseOrder')
    return { ...state, purchaseOrder } 
},FileAction)(ProjectForm)

const afterSubmit = (result, dispatch) => dispatch(reset('ProjectForm'));
export default reduxForm({ form: 'ProjectForm', 
// onSubmitSuccess: afterSubmit 
})(ProjectForm);

