import React,{ useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import { API_INVOCIE_EXE_TIME } from '../../assets/config/Config';
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
    if(projectType === "Mile Stone"){
        let modifyGenrateInvoiceData={ ...tempData, "mileStoneDtos": rowData}
        GenratePDFInvoice({modifyGenrateInvoiceData, props, setLoading, setViewInvoice })
    }else if(projectType === "Fixed Rate"){
        let filterRowData= rowData.length >0 && rowData.map(({tableData, ...rest})=>rest)
        let modifyGenrateInvoiceData={ ...tempData, "fixedRateInvoiceDetailDtos": filterRowData}
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
    FixedCostPreInvoiceTable
}