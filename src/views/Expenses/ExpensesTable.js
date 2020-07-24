import React from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { FromActions } from '../../assets/config/Config';
import { Field } from 'redux-form';
import { renderAutocomplete, renderDateTimePicker } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';
import * as ExpenseAction from "../../redux/actions/ExpensesAction";

const ExpensesTable = (props) => {
  const { projectList } = props.ProjectState
  const { fromAction, deleteMethod } = props
  const { ExpenseTypeList }=props.MasterDataSet
  let expenseTypeListOptions= ExpenseTypeList.length >0 && ExpenseTypeList.map((item,key)=>{return{title:item.name,id:item.id}})
  
  // creating columns
  const columns = [
    { title: 'Expense\u00a0Type', 
      field: 'expType', 
      editComponent: props => {
        return <Autocomplete
        id="auto-highlight"
        autoHighlight
        options={(expenseTypeListOptions && expenseTypeListOptions.length >0) ? expenseTypeListOptions: []}
        getOptionLabel={expenseTypeListOptions => (expenseTypeListOptions && expenseTypeListOptions.title) && expenseTypeListOptions.title}
        onChange={(event, value) => value && props.onChange(value.title)}
        renderInput={(params) => ( <TextField {...params} label="Expense Type" margin="normal"  /> )}
      /> 
      }
    },
    { title: 'Mobile\u00a0Number', field: 'mobileNumber' },
    { title: 'Description',field: 'description' },
    { title: 'Amount', 
      field: 'amount',
      editComponent: props=>{
        return <TextField
                  id="datetime-local"
                  label="Amount"
                  type="number"
                  onChange={e => props.onChange(e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
      }
    },
    { title: 'Date', 
      field: 'expDate',
      editComponent: props=>{
        return <TextField
                  id="datetime-local"
                  label="Expense Date"
                  type="date"
                  onChange={e => props.onChange(e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
      }
    },
    { title: "Attatchment",
      field:'attachmentUrl',
      editComponent: props=>{
        return <TextField 
                type="file"
               />
      }
    }
    
  ];


  // Creating rows
  const data = (projectList && projectList.length < 0) && projectList.map((item, key) => {
    return { "data": item, "projectName": item.projectName, "clientName": item.clientName }
  });

  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title=""
      columns={columns}
      data={data.length > 0 ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        search: false
      }}
      icons={{Add: () => <Button variant="contained" color="primary">Add Expense</Button>}}
      editable={{
        isEditable: rowData => false, 
        isEditHidden: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData =>{
          console.log("Added Data ",newData)
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1000)})
        },
        onRowUpdate: (newData, oldData) =>{},
        onRowDelete: oldData =>{}
      }}
      // actions={[
      //   {
      //     icon: () => <Button variant="contained" color="primary">Add Expense</Button>,
      //     onClick: (event, rowData) => { console.log(rowData) },
      //     isFreeAction: true,
      //     tooltip: 'Add Expense'
      //   }
      // ]}
    />
  </div>
}

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps, ExpenseAction)(ExpensesTable);
