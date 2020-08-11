import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { TableHeaderText } from '../../assets/config/TextConfig';


const RegsiterTable=(props)=>{
    const { userData } = props.LoginState
    const { fromAction, deleteMethod, handleAttendance } = props

    // creating columns
    const columns = [
        { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
        { title: 'Empolyee\u00a0Name', field: 'projectName' },
        { title: 'Employee\u00a0Code', field: 'clientName' },
        { title: 'Resources', field: 'resource', width: 30 },
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
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>deleteMethod(rowData.data)} />
          }
        }  
  ];

  // Creating rows
  const data = (userData && userData.length > 0) && userData.map((item, key) => {
    return { "key": (key + 1), "data": item, "projectName": item.projectName, "clientName": item.clientName }
  });

  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title={TableHeaderText.REGISTERTABLE}
      columns={columns}
      data={(data && data.length > 0 )? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        { icon: () => <div><Button variant="contained" color="primary">Create Employee</Button></div>,
          onClick: (event, rowData) => { fromAction(null, FromActions.CR); },
          isFreeAction: true,
          tooltip: 'Create Employee'
        },
        { icon: () => <div><Button variant="contained" color="primary">Upload Attendance</Button></div>,
          onClick: (event, rowData) => { handleAttendance()},
          isFreeAction: true,
          tooltip: 'Upload Attendance'
        }
      ]}
    />
  </div>

}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(RegsiterTable);

