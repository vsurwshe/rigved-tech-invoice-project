import React,{useState, forwardRef} from 'react';
import { reduxForm, change, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Slide, AppBar, Toolbar, IconButton, CircularProgress } from '@material-ui/core';
import useStyles from "../client/Styles";
import { Alert, Autocomplete } from '@material-ui/lab';
import { renderDateTimePicker, renderAutocompleteWithProps } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import * as ClientAction from "../../redux/actions/ClientAction";
import * as ProjectAction from "../../redux/actions/ProjectAction"
import * as InvoiceAction from "../../redux/actions/InvoiceAction"
import Invoice from './Invoice';
import CloseIcon from '@material-ui/icons/Close';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MaterialTable from 'material-table';
import { API_EXE_TIME } from '../../assets/config/Config';

// this method will used for the transition for model 
const Transition = forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });


let InvoiceFrom=(props)=>{
    var classes = useStyles();
    const { pristine, reset, submitting, handleSubmit} = props
    const { SaveInvoiceEmployeeData }=props.InvoiceAction
    const [viewInvoice, setViewInvoice] = useState(false);
    const [projectIdList, setProjectIdList] = useState([])
    const [viewSectionThree, setViewSectionThree] = useState(false)
    const [loading, setLoading] = useState(false)
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit((values)=>PostInvoiceData({"mainProps":props,values, projectIdList,viewSectionThree, setViewSectionThree, setLoading}))}>
            { LoadGird({"mainProps":props,projectIdList, setProjectIdList,viewSectionThree, setViewSectionThree,loading, setLoading})}
            {ShowViewInvoice({"mainProps":props,classes,viewInvoice,setViewInvoice})}
            <div className={classes.buttonStyle}>
                <center>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}>SUBMIT</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={async()=>{ await reset(); await SaveInvoiceEmployeeData([])}}> Clear Values</Button>&nbsp;&nbsp;
                    {/* <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); cancle() }}> Cancel</Button> &nbsp;&nbsp; */}
                    <Button type="button" variant="outlined" color="primary" onClick={()=> setViewInvoice(true)}>View Invoice</Button> 
                </center>
            </div>
        </form>
    </div>
}

// this method will used for the showing invoice after posting successfully resource table
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

// this method will used for the download the invoice table as pdf
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

// this method will used for the saving the genrate invoice
const PostInvoiceData=async(propsData)=>{
    const { values, setViewSectionThree, projectIdList, setLoading }=propsData
    const { authorization }=propsData.mainProps.LoginState
    const { GenerateInvoice }=propsData.mainProps.InvoiceAction
    let newInvoiceData={
        "fromDate":(values && values.fromDate) &&values.fromDate,
        "toDate":(values && values.toDate) &&values.toDate,
        "projectId":(projectIdList && projectIdList.length > 0)&&projectIdList[0].id
    }
    await setLoading(true);
    await GenerateInvoice(newInvoiceData,authorization);
    setTimeout(async()=>{
        await setLoading(false);
        await setViewSectionThree(true);
    },API_EXE_TIME)
}

// this method will used for the loading gird structure of invoice form component
const LoadGird = (props)=> {
    var classes = useStyles();
    const { projectIdList, setProjectIdList,viewSectionThree,loading}=props
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
        <center>{loading && LoadingCircle("Saving") }</center>
        <Grid container spacing={5} style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Grid item xs={12}>
                {viewSectionThree && SectionThree({ "mainProps": props.mainProps })}
            </Grid>
        </Grid>
        
    </>
}

const LoadingCircle=(message)=><center> {message} <CircularProgress size={40} /> </center>

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

// this is month name array
var months = ['', 'JANUARY', 'FEBRUARY', 'MARCH',  'APRIL', 'MAY', 'JUNE', 'JULY',  'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

// this sections will used for the showing structure
const SectionThree=(propsData)=>{
    const {invoiceEmployeeData }=propsData.mainProps.InvoiceState
    let columns=[
        {title: "EMP\u00a0ID", field:"employeeId"},
        {title: "EMP\u00a0NAME", field:"employeeName"},
        {title: "TOTAL\u00a0DAYS", field:"totalDays"},
        {title: "TOTAL\u00a0AMOUNT", field:"totalAmt"}
    ];
    let data=[];
    (invoiceEmployeeData && invoiceEmployeeData.length > 0) && invoiceEmployeeData.map((item,key)=>{
        let monthString =item.attendancepermonth ? item.attendancepermonth : "";
        let firstArray=monthString && monthString.split(',');
        let tempColunmsData = [];
        data.push({
            "employeeId":item.employeeId,
            "employeeName":item.employeeName,
            "totalDays":item.totalDays,
            "totalAmt":item.totalAmt
        })
        firstArray.forEach(element => {
            let monthNumber;
            let filterEqualArray;
            if(element.includes("{")){
                let tempArray=element.split('{')
                filterEqualArray= tempArray[1].split("=");
            }else if(element.includes("}")){
                let tempArray=element.split('}')
                filterEqualArray= tempArray[0].split("=");
            }else{
                filterEqualArray= element.split("=");
            }
            monthNumber=filterEqualArray && filterEqualArray[0].replace(/ /g, "");
            key === 0 && tempColunmsData.push({ title:months[monthNumber], field: months[monthNumber]})
            data[key][months[monthNumber]]= (filterEqualArray[1] && filterEqualArray[1].includes("}"))? (filterEqualArray[1].split('}')[0]):filterEqualArray[1]
        });
        columns.splice(4,0,...tempColunmsData)
        return "";
    })
    return LoadInvoiceResourceTable({columns,data});
}

// this method will used for the loading resource table
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
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch),
    ProjectAction:bindActionCreators(ProjectAction,dispatch),
    change: bindActionCreators(change, dispatch)
})
InvoiceFrom = connect(state => { return { ...state}}, mapDispatchToProps)(InvoiceFrom)
export default reduxForm({ form: 'InvoiceFrom' })(InvoiceFrom);