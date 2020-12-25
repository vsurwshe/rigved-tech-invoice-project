import React,{ useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import { API_EXE_TIME } from '../../assets/config/Config';
import moment from 'moment';

// this component will used for Milestone Pre Invoice table
const MileStonePreInvoiceTable=(propsData)=>{
    const { setLoading, setViewInvoice }=propsData
    const { preInvoiceMileStonesData }=propsData.props.mainProps.InvoiceState
    let columns = [
        { title: "", field: "id", hidden: true },
        { title: 'Milestone\u00a0Name', field: 'mileStoneDesc' },
        { title: 'Work\u00a0Completion(%)', field: 'workComPer' },
        { title: 'Invoice(%)', field: 'invoicePer'},
        { title: 'Completed ', field: 'compFlag'}
    ];
    
    return <LoadPreCreateInvoiceTable 
        title="Milestone completed on selected project"
        setLoading={setLoading}
        data={preInvoiceMileStonesData}
        setViewInvoice={setViewInvoice}
        columns={columns}
        props={propsData.props.mainProps}
    />
}

// this component will used for the Loading Table before genrate invoice for selecting resource
const LoadPreCreateInvoiceTable=(propsData)=>{
    const { columns, data, setLoading, setViewInvoice, initialValues, title, props } = propsData
    const [openDiscription, setOpenDiscription] = useState({view:false,rowData:[]})
    return <div style={{ maxWidth: "100%" }}>
        {openDiscription.view && <InvoiceDiscriptionDialog 
            open={openDiscription.view}
            handleClose={setOpenDiscription}
            rowData={openDiscription.rowData}
            props={props}
            setLoading={setLoading}
            setViewInvoice={setViewInvoice}
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
    const { open, handleClose, rowData, props, setLoading, setViewInvoice }=propsData
    const [description, setDescription] = useState("")
    return <div>
    <Dialog open={open} onClose={()=>handleClose({view:false, rowData:[]})} aria-labelledby="draggable-dialog-title" >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Invoice Discription </DialogTitle>
      <DialogContent>
        <TextField value={description} onChange={(event)=> setDescription(event.target.value)} autoFocus margin="dense" id="description" label="Invoice Description" type="text" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={()=>handleClose({view:false, rowData:[]})} color="primary"> Cancel </Button>
        <Button onClick={()=>loadGenrateInvoiceButton({rowData, props, description, setLoading, setViewInvoice})} color="secondary"> Save Invoice </Button>
      </DialogActions>
    </Dialog>
  </div>
}

// this method will help to handel onclick of genrate invoice
const loadGenrateInvoiceButton=(propsData)=>{
    const { rowData, props, description, setLoading, setViewInvoice }=propsData
    const { values }=props.form.InvoiceFrom
    let modifyGenrateInvoiceData={
        "mileStoneDtos":rowData,
        "fromDate": new moment(values.fromDate).format('x'),
        "toDate":new moment(values.toDate).format('x'),
        "projectId": values.projectList.id,
        "description":description
    }
    GenratePDFInvoice({modifyGenrateInvoiceData, props, setLoading, setViewInvoice })
}

// this method will used for genrate pdf invoice
const GenratePDFInvoice=async (propsData)=>{
    const { modifyGenrateInvoiceData, setLoading, setViewInvoice, props }=propsData
    const { authorization }=props.LoginState
    const { loadMessage } = props.ClientAction
    const { invoiceEmployeeData } = props.InvoiceState
    const { GenerateInvoicePDF, SaveGenratedInvoiceData, getPDFInvoiceList}=props.InvoiceAction
    await setLoading(true);
    // await SaveGenratedInvoiceData([]);
    await GenerateInvoicePDF(modifyGenrateInvoiceData, authorization);
    setTimeout(async () => {
        await loadMessage();
        // await GetBillingData(authorization,{});
        await getPDFInvoiceList(0,100,authorization);
        await setLoading(false);
        (invoiceEmployeeData && invoiceEmployeeData.length !==0) && await setViewInvoice(true);
    }, API_EXE_TIME)
}

export{
    LoadPreCreateInvoiceTable,
    MileStonePreInvoiceTable
}