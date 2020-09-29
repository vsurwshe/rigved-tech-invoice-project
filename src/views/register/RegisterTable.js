import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';
import { TableHeaderText } from '../../assets/config/TextConfig';
import moment from 'moment';
<<<<<<< HEAD
=======

>>>>>>> 0.16.6: Recycle the loading circle

const RegsiterTable=(props)=>{
    const { EmployeeList } = props.MasterDataSet
    const { fromAction, handleAttendance } = props

    // creating columns
    const columns = [
        { title: 'Sr.\u00a0No.', field: 'key', width: 5 },
        { title: 'Name', field: 'name' },
        { title: 'Code', field: 'employeeNumber',width: 10 },
        { title: 'Email', field: 'emailId' },
        { title: 'Designation', field: 'designation' },
        { title: 'Mobile\u00a0Number', field: 'mobileNumber', width: 10 },
        { title: 'Last\u00a0Attendance\u00a0Date', field: 'lastUploadedAttendance'},
        // {
        //   title: "",
        //   width:8,
        //   render: (rowData)=> {
        //       return<VisibilityIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.VI,true)} />
        //   }
        // },
        // {
        //   title: "",
        //   width:8,
        //   render: (rowData)=> {
        //       return<CreateIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.ED,true)} />
        //   }
        // },
        // {
        //   title: "",
        //   width:8,
        //   render: (rowData)=> {
        //       return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>console.log("Delete method called ",rowData)} />
        //   }
        // }  
  ];

  // Creating rows
  const data = (EmployeeList && EmployeeList.length > 0) && EmployeeList.map((item, key) => {
<<<<<<< HEAD
<<<<<<< HEAD
    return { "key": (key + 1), "data": item,"employeeNumber":item.employeeNumber,"designation":item.designation, "emailId": item.emailId,"mobileNumber": item.mobileNumber, "name": item.firstName+" "+item.lastName, "lastUploadedAttendance":item.latestAttFromDate && moment(item.latestAttFromDate).format('DD-MM-YYYY') +" to "+moment(item.latestAttToDate).format('DD-MM-YYYY') }
=======
    return { "key": (key + 1), "data": item,"employeeNumber":item.employeeNumber,"designation":item.designation, "emailId": item.emailId,"mobileNumber": item.mobileNumber, "name": item.firstName+" "+item.lastName, "lastUploadedAttendance":item.latestAttFromDate && item.latestAttFromDate+"-"+item.latestAttToDate  }
>>>>>>> 0.14.31: Modify the upload attendance and added last updated attendance
=======
    return { "key": (key + 1), "data": item,"employeeNumber":item.employeeNumber,"designation":item.designation, "emailId": item.emailId,"mobileNumber": item.mobileNumber, "name": item.firstName+" "+item.lastName, "lastUploadedAttendance":item.latestAttFromDate && moment(item.latestAttFromDate).format('DD-MM-YYYY') +" to "+moment(item.latestAttToDate).format('DD-MM-YYYY') }
>>>>>>> 0.16.6: Recycle the loading circle
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
        { icon: () => <div><Button variant="contained" color="primary">Upload Attendance</Button></div>,
          onClick: (event, rowData) => { handleAttendance()},
          isFreeAction: true,
          tooltip: 'Upload Attendance'
        },
        { icon: () => <div><Button variant="contained" color="primary">Create Employee</Button></div>,
          onClick: (event, rowData) => { fromAction(null, FromActions.CR); },
          isFreeAction: true,
          tooltip: 'Create Employee'
        }
      ]}
    />
  </div>

}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(RegsiterTable);

