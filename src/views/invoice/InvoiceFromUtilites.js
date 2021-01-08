import React,{ useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import { API_INVOCIE_EXE_TIME, ProjectBillingModelType } from '../../assets/config/Config';
import moment from 'moment';

// this component will used for Milestone Pre Invoice table
const MileStonePreInvoiceTable=(propsData)=>{
    const { setLoading, setViewInvoice, projectType, tableData, props }=propsData
    const { preInvoiceMileStonesData }=props.InvoiceState
    let columns = [
        { title: "", field: "id", hidden: true },
        { title: 'Milestone\u00a0Name', field: 'mileStoneDesc' },
        { title: 'Milestone\u00a0Amount', field: 'mileStoneCost' },
    ];
    
    return <LoadPreCreateInvoiceTable 
        title=" "
        setLoading={setLoading}
        data={(tableData && tableData.length >0) ? tableData : preInvoiceMileStonesData}
        setViewInvoice={setViewInvoice}
        columns={columns}
        initialValues={tableData}
        props={props}
        projectType={projectType}
    />
}

// this component will used for Fixed Cost Invoice Tabel
const FixedCostPreInvoiceTable=(propsData)=>{
    const { setLoading, setViewInvoice, projectType, tableData, props }=propsData
    const { preInvoiceFixedCostData }=props.InvoiceState
    let columns = [
        { title: "", field: "id", hidden: true },
        {  title: 'Start\u00a0Date', 
           field: 'startDate',
           render: (rowData)=> {
            const { startDate }=rowData
            return startDate  ? new moment(startDate).format("YYYY-MM-DD"):""
          } 
        },
        { title: 'End\u00a0Date', 
          field: 'endDate',
          render: (rowData)=> {
           const { endDate }=rowData
           return endDate  ? new moment(endDate).format("YYYY-MM-DD"):""
         }  
        },
        { title: 'Amount', field: 'amount'},
    ];
    
    return <LoadPreCreateInvoiceTable 
        title=" "
        setLoading={setLoading}
        data={(tableData && tableData.length >0) ? tableData : preInvoiceFixedCostData}
        setViewInvoice={setViewInvoice}
        initialValues={tableData}
        columns={columns}
        props={props}
        projectType={projectType}
    />
}

// this comonent will used for the payable days tabel
const PayableDaysPreInvoiceTable=(propsData)=>{
    const { setLoading, props, setViewInvoice, projectType,tableData }=propsData
    const { preInvoicePayablesData }=props.InvoiceState
    let columns = [
        { title: "EMP\u00a0ID", field: "employeeId" },
        { title: "EMP\u00a0NAME", field: "employeeName" },
        { title: "PER\u00a0DAY\u00a0RATE", field: "perDayRate" },
        { title: "TOTAL\u00a0DAYS", field: "totalDays" },
        { title: "TOTAL\u00a0AMOUNT", field: "totalAmt" }
    ];
    let data = [];
    return<> 
    {PrepareDataForResourceTable({listOfRows:tableData ? tableData: preInvoicePayablesData, data, columns})}
    <LoadPreCreateInvoiceTable 
        title=" "
        setLoading={setLoading}
        data={data}
        setViewInvoice={setViewInvoice}
        initialValues={tableData}
        columns={columns}
        props={props}
        projectType={projectType}
    />
    </>
}

// this is month name array
var months = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

// this method will used for payables days
const PrepareDataForResourceTable=(props)=>{
    const { listOfRows, data, columns}=props
   return (listOfRows && listOfRows.length > 0) && listOfRows.map((item, key) => {
        let monthString = item.attendancepermonth ? item.attendancepermonth : "";
        let firstArray = monthString && monthString.split(',');
        let tempColunmsData = [];
        data.push({ "data":item, ...item })
        firstArray.forEach(element => {
            let monthNumber;
            let filterEqualArray;
            if (element.includes("{")) {
                let tempArray = element.split('{')
                filterEqualArray = tempArray[1].split("=");
            } else if (element.includes("}")) {
                let tempArray = element.split('}')
                filterEqualArray = tempArray[0].split("=");
            } else {
                filterEqualArray = element.split("=");
            }
            monthNumber = filterEqualArray && filterEqualArray[0].replace(/ /g, "");
            key === 0 && tempColunmsData.push({ title: months[monthNumber], field: months[monthNumber] })
            data[key][months[monthNumber]] = (filterEqualArray[1] && filterEqualArray[1].includes("}")) ? (filterEqualArray[1].split('}')[0]) : filterEqualArray[1]
        });
        columns.splice(5, 0, ...tempColunmsData)
        return "";
    })
}


// this component will used for the Loading Table before genrate invoice for selecting resource
const LoadPreCreateInvoiceTable=(propsData)=>{
    const { columns, data, setLoading, setViewInvoice, initialValues, title, props, projectType } = propsData
    const [openDiscription, setOpenDiscription] = useState({view:false,rowData:[]})
    return <div style={{ maxWidth: "100%" }}>
        {openDiscription.view && <InvoiceDiscriptionDialog 
            open={openDiscription.view}
            handleClose={setOpenDiscription}
            rowData={openDiscription.rowData}
            props={props}
            setLoading={setLoading}
            setViewInvoice={setViewInvoice}
            projectType={projectType}
        />}
        <MaterialTable
            title={title}
            columns={columns}
            data={data.length > 0 ? data : []}
            options={{
                headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
                search: false,
                selection: !initialValues ? true : false,
                actionsColumnIndex: -1
            }}
            actions={[
                (rowData) => { return !initialValues && {   
                    icon: () => <div><Button variant="contained" color="primary">Generate Invoice</Button></div>,
                    onClick: (event, rowData) => setOpenDiscription({view:true,rowData}),
                    tooltip: 'Generate Invoice'
                }}
            ]}
        />
    </div>
}

// this compoent will used for the show dailog box for enter description
const InvoiceDiscriptionDialog=(propsData)=>{
    const { open, handleClose, rowData, props, setLoading, setViewInvoice, projectType }=propsData
    const [description, setDescription] = useState("")
    return <div>
    <Dialog open={open} onClose={()=>handleClose({view:false, rowData:[]})} aria-labelledby="draggable-dialog-title" >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Invoice Discription </DialogTitle>
      <DialogContent>
        <TextField value={description} onChange={(event)=> setDescription(event.target.value)} autoFocus margin="dense" id="description" label="Invoice Description" type="text" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={()=>handleClose({view:false, rowData:[]})} color="primary"> Cancel </Button>
        <Button onClick={()=>loadGenrateInvoiceButton({rowData, props, description, setLoading, setViewInvoice, projectType})} color="secondary"> Save Invoice </Button>
      </DialogActions>
    </Dialog>
  </div>
}

// this method will help to handel onclick of genrate invoice
const loadGenrateInvoiceButton=(propsData)=>{
    const { rowData, props, description, setLoading, setViewInvoice, projectType }=propsData
    const { values }=props.form.InvoiceFrom
    let tempData={
        "fromDate": new moment(values.fromDate).format('x'),
        "toDate":new moment(values.toDate).format('x'),
        "projectId": values.projectList.id,
        "description":description
    }
    if(projectType === ProjectBillingModelType.MILE_STONE){
        let modifyGenrateInvoiceData={ ...tempData, "mileStoneDtos": rowData}
        GenratePDFInvoice({modifyGenrateInvoiceData, props, setLoading, setViewInvoice })
    }else if(projectType === ProjectBillingModelType.FIXED_TYPE){
        let filterRowData= rowData.length >0 && rowData.map(({tableData, ...rest})=>rest)
        let modifyGenrateInvoiceData={ ...tempData, "fixedRateInvoiceDetailDtos": filterRowData}
        GenratePDFInvoice({modifyGenrateInvoiceData, props, setLoading, setViewInvoice })
    }else if(projectType === ProjectBillingModelType.PAYABLES_DAY){
        let filterRowData= rowData.length >0 && rowData.map(({tableData, data, ...rest})=>rest)
        let modifyGenrateInvoiceData={ ...tempData, "invoiceDetailDtos": filterRowData}
        GenratePDFInvoice({modifyGenrateInvoiceData, props, setLoading, setViewInvoice })
    }
}

// this method will used for genrate pdf invoice
const GenratePDFInvoice=async (propsData)=>{
    const { modifyGenrateInvoiceData, setLoading, setViewInvoice, props }=propsData
    const { dispatch }=props
    const { authorization }=props.LoginState
    const { loadMessage } = props.ClientAction
    const { GenerateInvoicePDF, getPDFInvoiceList}=props.InvoiceAction
    await setLoading(true);
    await GenerateInvoicePDF(modifyGenrateInvoiceData, authorization);
    setTimeout(async () => {
        await dispatch(loadMessage());
        await getPDFInvoiceList(0,100,authorization);
        await setViewInvoice(true);
        await setLoading(false);
    }, API_INVOCIE_EXE_TIME)
}

export{
    LoadPreCreateInvoiceTable,
    MileStonePreInvoiceTable,
    FixedCostPreInvoiceTable,
    PayableDaysPreInvoiceTable
}