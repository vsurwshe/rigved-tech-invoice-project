import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';

const ProjectTable=(props)=>{
    const { projectList}=props.ProjectState
    const { createProject, viewProject, deleteProject}=props 
    
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
              return<VisibilityIcon variant="contained" color="primary" onClick={()=>viewProject(rowData.data,FromActions.VI)} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<CreateIcon variant="contained" color="primary" onClick={()=>viewProject(rowData.data,FromActions.ED)} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>deleteProject(rowData.data)} />
          }
        }  
    ];
    
    // Creating rows
    const data=(projectList && projectList.length >0 )&& projectList.map((item,key)=>{ 
      return { "key":(key+1), "data":item, "poAmount":item.poAmount, "poNum":item.poNum, "clientName":item.clientName }
    });
    
    return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title="Project Managment"
      columns={columns}
      data={data.length > 0 ? data :[]}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        {icon: () =><Button variant="contained" color="primary">Create Project</Button>,
          onClick: (event, rowData) => { createProject(null,FromActions.CR); },
          isFreeAction: true,
          tooltip: 'Create Project'}
      ]}
    />
    </div>
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ProjectTable);
