import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';

const ProjectTable = (props) => {
  const { projectList } = props.ProjectState
  const { createProject } = props

  // creating columns
  const columns = [
    { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
    { title: 'Project\u00a0Name', field: 'projectName' },
    { title: 'Client\u00a0Name', field: 'clientName' },
    { title: 'Resources', field: 'resource', width: 30 },
    {
      title: "PO\u00a0Recieved",
      width: 8,
      render: (rowData) => {
        return <Checkbox onChange={() => console.log("Checkbox Clicked")} name="jason" />
      }
    },
    { title: 'Status', field: 'status', width: 60 },
    {
      title: "Actions",
      width: 8,
      render: (rowData) => {
        return <Autocomplete
          id="combo-box-actions"
          options={loadActions}
          getOptionLabel={(option) => option.title}
          style={{ width: 150 }}
          renderInput={(params) => <TextField {...params} label="Actions" />}
        />
      }
    }
  ];

  // this will load the autocompelete actions drop down
  const loadActions = [
    { title: 'Actions 1', year: 1994 },
    { title: 'Actions 2', year: 1972 }
  ]
  // Creating rows
  const data = (projectList && projectList.length > 0) && projectList.map((item, key) => {
    return { "key": (key + 1), "data": item, "projectName": item.projectName, "clientName": item.clientName }
  });

  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title="Project Managment"
      columns={columns}
      data={data.length > 0 ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
      }}
      actions={[
        {
          icon: () => <Button variant="contained" color="primary">Create Project</Button>,
          onClick: (event, rowData) => { createProject(null, FromActions.CR); },
          isFreeAction: true,
          tooltip: 'Create Project'
        }
      ]}
    />
  </div>
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ProjectTable);
