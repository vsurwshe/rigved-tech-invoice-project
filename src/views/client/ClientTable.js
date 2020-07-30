import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MaterialTable from 'material-table';

const  ClientTable=(props)=>{
  const {listOfClient}= props.ClientState
  const {viewClientDetails, deleteClientDetails, createClient}= props
  // creating columns
  const columns = [
    { title: 'Sr.\u00a0No.', field:'key', width: 20 },
    { title: 'Name',field:'name'},
    { title: 'GST\u00a0Number',field:'GST', width :30},
    { title: 'TAN\u00a0Number', field:'TAN', width: 60},
    {
      title: "",
      width:8,
      render: (rowData)=> {
          return<VisibilityIcon variant="contained" color="primary" onClick={()=>viewClientDetails(rowData.data,"view")} />
      }
    },
    {
      title: "",
      width:8,
      render: (rowData)=> {
          return<CreateIcon variant="contained" color="primary" onClick={()=>viewClientDetails(rowData.data,"edit")} />
      }
    },
    {
      title: "",
      width:8,
      render: (rowData)=> {
          return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>deleteClientDetails(rowData.data)} />
      }
    }  
  ];

  // Creating rows
  const data=(listOfClient && listOfClient.length >0 )&& listOfClient.map((item,key)=>{ 
    return { "key":(key+1), "data":item, "name":item.clientName, "GST":item.gstNum, "TAN":item.tanNum }
  });  
 
  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title="Client Managment"
      columns={columns}
      data={data.length >0 ? data :[]}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        {icon: () =><Button variant="contained" color="primary">Create Client</Button>,
          onClick: (event, rowData) => { createClient(null,"create"); },
          isFreeAction: true,
          tooltip: 'Create Client'}
      ]}
    />
  </div>
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ClientTable);