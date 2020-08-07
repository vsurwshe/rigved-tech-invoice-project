import React,{useState, forwardRef} from 'react';
import { reduxForm, change, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Slide, AppBar, Toolbar, IconButton } from '@material-ui/core';
import useStyles from "../client/Styles";
import { Alert, Autocomplete } from '@material-ui/lab';
import { renderDateTimePicker, renderAutocompleteWithProps } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import * as ClientAction from "../../redux/actions/ClientAction";
import * as ProjectAction from "../../redux/actions/ProjectAction"
import Invoice from './Invoice';
import CloseIcon from '@material-ui/icons/Close';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MaterialTable from 'material-table';

// this method will used for the transition for model 
const Transition = forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });


let InvoiceFrom=(props)=>{
    var classes = useStyles();
    const { pristine, reset, submitting, handleSubmit, cancle } = props
    const [viewInvoice, setViewInvoice] = useState(false);
    const [projectIdList, setProjectIdList] = useState([])
    const [viewSectionThree, setViewSectionThree] = useState(false)
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit((values)=>PostInvoiceData({values, viewSectionThree, setViewSectionThree}))}>
            {LoadGird({"mainProps":props,projectIdList, setProjectIdList,viewSectionThree, setViewSectionThree})}
            {ShowViewInvoice({"mainProps":props,classes,viewInvoice,setViewInvoice})}
            <div className={classes.buttonStyle}>
                <center>
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
        <DialogTitle>Generated Invoice</DialogTitle>
      </Toolbar>
    </AppBar>
    <DialogContent>
        <Invoice />
    </DialogContent>
    <DialogActions>
        <Button onClick={()=> setViewInvoice(false)} color="primary">Cancel</Button>
        <Button onClick={()=> DwonloadInvoice()} color="secondary">Download Invoice</Button>
    </DialogActions>
</Dialog>
}

const DwonloadInvoice=()=>{
    let htmlTable=document.getElementById('invoiceProject');
    html2canvas(htmlTable,{ 
        allowTaint: true, 
        backgroundColor:"rgba(255, 255, 255, 1)",
    }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p','pt', 'a4');
    pdf.addImage(imgData, 'PNG', 25, 100);
    pdf.save("downloadInvoice.pdf");  
  });
}

const PostInvoiceData=(propsData)=>{
    const { values, viewSectionThree, setViewSectionThree }=propsData
    console.log("Subimt Data",propsData, values, viewSectionThree,)
    setViewSectionThree(true);
}

const LoadGird = (props) => {
    var classes = useStyles();
    const { projectIdList, setProjectIdList,viewSectionThree}=props
    const {color, common_message}=props.mainProps.ClientState
    return <><Grid container spacing={5}>
        {(common_message)&&<center><Alert color={color}>{common_message}</Alert></center>}
        </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6}  style={{ paddingLeft: 30, paddingTop: 30 }}>
                {SectionOne({ classes, "mainProps":props.mainProps, projectIdList, setProjectIdList })}
            </Grid>
            <Grid item xs={12} sm={6}  style={{ paddingLeft: 30, paddingTop: 30 }} >
                {SectionTwo({ classes, "mainProps":props.mainProps })}
            </Grid>
        </Grid>
        <Grid container spacing={5} style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Grid item xs={12}>
                {viewSectionThree && SectionThree({ classes, "mainProps": props })}
            </Grid>
        </Grid>
    </>
}
// this method will used for the load the left side part 
const SectionOne = (data) => {
    const { setProjectIdList }=data
    const { listOfClient }=data.mainProps.ClientState
    const { authorization }=data.mainProps.LoginState
    const { projectListByClient }=data.mainProps.ProjectState
    const { GetClientList }=data.mainProps.ClientAction
    const { GetProjectListByClient }=data.mainProps.ProjectAction
    const [clientCall, setClientCall] = useState(0);

    if(listOfClient.length <=0 && clientCall === 0){
        GetClientList(0,20,authorization);
        setClientCall(clientCall+1);
    }

    let clientOptions = (listOfClient && listOfClient.length > 0) && listOfClient.map((item, key) => {
        return { title: item.clientName ? item.clientName : "", id: item.id }
    })

    let projectOptions=(projectListByClient  && projectListByClient.length >0) && projectListByClient.map((item,key)=>{
        return { title: item.clientName ? item.projectName : "", id: item.id }
    })
    return <>
        <Field name="clientName" component={renderAutocompleteWithProps}
        onChange={(value) => {
            change('ProjectForm', 'clientName', value.title);
            GetProjectListByClient(0,20,value.id,authorization)
        }}
        optionData={clientOptions} label="Client Name" validate={[Required]} />
        <Autocomplete
              id="projectList"
              autoHighlight
              multiple
              options={(projectOptions && projectOptions.length >0) ? projectOptions: []}
              getOptionLabel={projectOptions => (projectOptions && projectOptions.title) && projectOptions.title}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(event, value) =>  value && setProjectIdList(value)}
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

const SectionThree=(propsData)=>{
    let columns=[
        { title: 'Row 1', field: '1'},
        { title: 'Row 2', field: '2'},
        { title: 'Row 3', field: '3'}
    ];
    let data=[
        {"1":1,"2":2,"3":3},
        {"1":1,"2":2,"3":3},
        {"1":1,"2":2,"3":3}
    ];
    return LoadInvoiceResourceTable({columns,data});
}

const LoadInvoiceResourceTable=(propsData)=>{
    const { columns, data}= propsData
    return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title=""
      columns={columns}
      data={data.length > 0 ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        search: false,
        selection: true
      }}
      actions={[
        { icon: () => <div><Button variant="contained" color="primary">Genrate Invoice</Button></div>,
          onClick: (event, rowData) => { console.log(rowData) },
          tooltip: 'Create Project'
        }
      ]}
    />
  </div>
}

// make the selector 
// const selector = formValueSelector('InvoiceFrom')
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction,dispatch),
    ProjectAction:bindActionCreators(ProjectAction,dispatch),
    change: bindActionCreators(change, dispatch)
})
InvoiceFrom = connect(state => {
    // can select values individually
    return { ...state}
}, mapDispatchToProps)(InvoiceFrom)
export default reduxForm({ form: 'InvoiceFrom' })(InvoiceFrom);
