import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

const InvoiceTable=(props)=>{
    const { invoiceList, fromAction }=props
    // creating columns
    const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Client', field: 'clientName' },
      { title: 'Invoice\u00a0Date', field: 'invoiceDate',width: 30 },
      { title: 'Invoice\u00a0Number', field: 'invoiceNumber', width:30 },
      { title: 'Person\u00a0Responsible', field: 'personResponsible' },
      { title: 'Due\u00a0Date', field: 'dueDate', width: 30 },
      { title: 'Total\u00a0Amount', field: 'totalAmount', width: 60 },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<VisibilityIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.VI,true)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<CreateIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.ED,true)} />
        }
      }
    ];

  // Creating rows
  const data = (invoiceList && invoiceList.length > 0) && invoiceList.map((item, key) => {
    return { "key": (key + 1), "data": item, "projectName": item.projectName, "clientName": item.clientName }
  });

  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title="Invoice Managment"
      columns={columns}
      data={(data && data.length > 0) ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        { icon: () => <div><Button variant="contained" color="primary">Create Invoice</Button></div>,
          onClick: (event, rowData) => { fromAction(null, FromActions.CR); },
          isFreeAction: true,
          tooltip: 'Create Invoice'
        }
      ]}
    />
  </div>
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(InvoiceTable);