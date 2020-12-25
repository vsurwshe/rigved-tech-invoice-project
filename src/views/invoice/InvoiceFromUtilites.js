import React from 'react';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { API_EXE_TIME } from '../../assets/config/Config';

const MileStonePreInvoiceTable=(props)=>{
    const { preInvoiceMileStonesData }=props.props.mainProps.InvoiceState
    let columns = [
        { title: "", field: "id", hidden: true },
        { title: 'Milestone\u00a0Name', field: 'mileStoneDesc' },
        { title: 'Work\u00a0Completion(%)', field: 'workComPer' },
        { title: 'Invoice(%)', field: 'invoicePer'},
        { title: 'Completed ', field: 'compFlag'}
    ];
    
    return <LoadPreCreateInvoiceTable 
        title="Milestone completed on selected project"
        data={preInvoiceMileStonesData}
        columns={columns}
    />
}


// this component will used for the Loading Table before genrate invoice for selecting resource
const LoadPreCreateInvoiceTable=(propsData)=>{
    const { columns, data, projectIdList, setLoading, setViewInvoice, initialValues, title } = propsData
    return <div style={{ maxWidth: "100%" }}>
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
                    onClick: (event, rowData) => loadGenrateInvoiceButton({event,rowData,  projectIdList, setLoading, setViewInvoice}),
                    tooltip: 'Generate Invoice'
                }}
            ]}
        />
    </div>
}

// this method will help to handel onclick of genrate invoice
const loadGenrateInvoiceButton=(props)=>{
    const { rowData,  projectIdList, setLoading }=props
    let tempInvoiceDetails= (rowData && rowData.length >0) && rowData.map((item,key)=>item.data);
    console.log("PRD ",props)
    // if(tempInvoiceDetails){
    //     GenratePDFInvoice({invoiceDetailDtos: tempInvoiceDetails, "mainProps":props.mainProps, projectIdList, setLoading, setViewInvoice })
    // } 
}

// this method will used for genrate pdf invoice
const GenratePDFInvoice=async (propsData)=>{
    const { projectIdList, invoiceDetailDtos, setLoading, setViewInvoice }=propsData
    const { fromDateProps, toDateProps }=propsData.mainProps
    const { authorization }=propsData.mainProps.LoginState
    const { loadMessage } = propsData.mainProps.ClientAction
    // const { genratedInvoiceData } = propsData.mainProps.InvoiceState
    const { GenerateInvoicePDF, SaveGenratedInvoiceData, getPDFInvoiceList}=propsData.mainProps.InvoiceAction
    let newInvoiceGenratePDFData={
        "fromDate":fromDateProps && fromDateProps ,
        "toDate": toDateProps && toDateProps ,
        "projectId": (projectIdList.length>0) && projectIdList[0].id,
        "invoiceDetailDtos": (invoiceDetailDtos.length>0 )&& invoiceDetailDtos
    }
    await setLoading(true);
    await SaveGenratedInvoiceData([]);
    await GenerateInvoicePDF(newInvoiceGenratePDFData, authorization);
    setTimeout(async () => {
        await loadMessage();
        // await GetBillingData(authorization,{});
        await getPDFInvoiceList(0,100,authorization);
        await setLoading(false);
        await setViewInvoice(true);
    }, API_EXE_TIME)
}


export{
    LoadPreCreateInvoiceTable,
    MileStonePreInvoiceTable
}