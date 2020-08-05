import React,{useState, forwardRef} from 'react';
import { formValueSelector, reduxForm, change, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Slide, AppBar, Toolbar, IconButton } from '@material-ui/core';
import useStyles from "../client/Styles";
import { Alert, Autocomplete } from '@material-ui/lab';
import { renderDateTimePicker, renderAutocompleteWithProps } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import * as ClientAction from "../../redux/actions/ClientAction";
import { GetProjectListByClient } from "../../redux/actions/ProjectAction";
import Invoice from './Invoice';
import CloseIcon from '@material-ui/icons/Close';

// this method will used for the transition for model 
const Transition = forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });


let InvoiceFrom=(props)=>{
    var classes = useStyles();
    const { pristine, reset, submitting, handleSubmit, cancle } = props
    const [viewInvoice, setViewInvoice] = useState(false);

    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit((values)=>console.log("Value ",values))}>
            {LoadGird(props)}
            {ShowViewInvoice({"mainProps":props,classes,viewInvoice,setViewInvoice})}
            <div className={classes.buttonStyle}>
                <center>
                    {/* {(operation === FromActions.CR || operation === FromActions.ED) && <> </>} */}
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}>SUBMIT</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); cancle() }}> Cancel</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="primary" onClick={()=> setViewInvoice(true)}>View Invoice</Button> 
                </center>
            </div>
        </form>
    </div>
}

const ShowViewInvoice=(propsData)=>{
    const { viewInvoice, setViewInvoice, classes }=propsData
    return <Dialog fullScreen open={viewInvoice} onClose={()=> setViewInvoice(false)} TransitionComponent={Transition}>
    <AppBar  className={classes.dialogAppBar}  style={{float: "right"}} >
      <Toolbar >
        <IconButton classes={{ paper: classes.profileMenuIcon }} color="inherit" onClick={()=> setViewInvoice(false)} aria-label="close"> <CloseIcon  /> </IconButton>
        <DialogTitle>Invoice</DialogTitle>
      </Toolbar>
    </AppBar>
    <DialogContent>
        <Invoice />
    </DialogContent>
    <DialogActions>
        <Button onClick={()=> setViewInvoice(false)} color="primary">Cancel</Button>
    </DialogActions>
</Dialog>
}

const LoadGird = (props) => {
    var classes = useStyles();
    const {color, common_message}=props.ClientState
    return <><Grid container spacing={5}>
        {(common_message)&&<center><Alert color={color}>{common_message}</Alert></center>}
        </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6}  style={{ paddingLeft: 30, paddingTop: 30 }}>
                {SectionOne({ classes, "mainProps":props })}
            </Grid>
            <Grid item xs={12} sm={6}  style={{ paddingLeft: 30, paddingTop: 30 }} >
                {SectionTwo({ classes, "mainProps":props })}
            </Grid>
        </Grid>
        {/* <Grid container spacing={5} style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Grid item xs={12}>
                {SectionThree({ classes, "mainProps": props })}
            </Grid>
        </Grid> */}
    </>
}
// this method will used for the load the left side part 
const SectionOne = (data) => {
    const { listOfClient }=data.mainProps.ClientState
    const { authorization }=data.mainProps.LoginState
    const { projectListByClient }=data.mainProps.ProjectState
    const { GetClientList }=data.mainProps.ClientAction
    const [clientCall, setClientCall] = useState(0);
    const [projectListCountCall, setProjectListCountCall] = useState(0);
    const [clientId, setClientId] = useState(null);
    const [projectIdList, setProjectIdList] = useState([])

    if(listOfClient.length <=0 && clientCall === 0){
        GetClientList(0,20,authorization);
        setClientCall(clientCall+1);
    }

    if(projectListCountCall===0 && clientId){
        GetProjectListByClient(0,20,clientId,authorization);
        setProjectListCountCall(projectListCountCall+1);
    }

    let clientOptions = listOfClient.length > 0 && listOfClient.map((item, key) => {
        return { title: item.clientName ? item.clientName : "", id: item.id }
    })

    let projectOptions=projectListByClient.length >0 && projectListByClient.map((item,key)=>{
        return { title: item.clientName ? item.clientName : "", id: item.id }
    })
    console.log("Client id",clientId,projectListCountCall);
    return <>
        <Field name="clientName" component={renderAutocompleteWithProps}
        onChange={(value) => {
            change('ProjectForm', 'clientName', value.title);
            setClientId(value.id);
        }}
        optionData={clientOptions} label="Client Name" validate={[Required]} />
        <Autocomplete
              id="projectList"
              autoHighlight
              multiple
              options={(projectOptions && projectOptions.length >0) ? projectOptions: []}
              getOptionLabel={projectOptions => (projectOptions && projectOptions.title) && projectOptions.title}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(event, value) => value && setProjectIdList([value.id])}
              renderInput={(params) => ( <TextField {...params} label="Project" margin="normal"  /> )}
        />
    </>
}

// this method will used for the right side part of this component
const SectionTwo = (data) => {
    const { classes } = data
    return <>
        <Field name="fromDate" component={renderDateTimePicker} className={classes.textField} label="From Date" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="toDate" component={renderDateTimePicker} className={classes.textField} label="To Date" helperText="Ex. 01/01/2000" validate={[Required]} />
    </>
}

// make the selector 
const selector = formValueSelector('InvoiceFrom')
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction,dispatch),
    change: bindActionCreators(change, dispatch)
})
InvoiceFrom = connect(state => {
    // can select values individually
    return { ...state}
}, mapDispatchToProps)(InvoiceFrom)
export default reduxForm({ form: 'InvoiceFrom' })(InvoiceFrom);
