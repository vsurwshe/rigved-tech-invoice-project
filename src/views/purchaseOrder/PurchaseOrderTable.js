import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core';


const PurchaseOrderTable=(props)=>{
    const { purchaseOrderList}=props.PurchaseOrderState
    const { createPurchaseOrder, viewPurchaserOrder, deletePuchaseOrderDetails}=props 

      // creating columns
    const columns = [
        { title: 'Sr.\u00a0No.', field:'key', width: 20 },
        { title: 'Name',field:'clientName'},
        { title: 'Amount',field:'poAmount', width :30},
        { title: 'Number', field:'poNum', width: 60},
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<VisibilityIcon variant="contained" color="primary" onClick={()=>viewPurchaserOrder(rowData.data,"view")} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<CreateIcon variant="contained" color="primary" onClick={()=>viewPurchaserOrder(rowData.data,"edit")} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>deletePuchaseOrderDetails(rowData.data)} />
          }
        }  
    ];

    // Creating rows
    const data=(purchaseOrderList && purchaseOrderList.length >0 )&& purchaseOrderList.map((item,key)=>{ 
      return { "key":(key+1), "data":item, "poAmount":item.poAmount, "poNum":item.poNum, "clientName":item.clientName }
    });
    console.log("pt ",data)
    return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title="Purchase Order Managment"
      columns={columns}
      data={data.length > 0 ? data :[]}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        {icon: () =><Button variant="contained" color="primary">Create PO</Button>,
          onClick: (event, rowData) => { createPurchaseOrder(null,"create"); },
          isFreeAction: true,
          tooltip: 'Create PO'}
      ]}
    />
  </div>

}


const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(PurchaseOrderTable);
