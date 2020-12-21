import React,{ useState } from 'react';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Field } from 'redux-form';
import { loadMessage } from "../../redux/actions/ClientAction"
import { renderMatiralCheckbox } from '../utilites/FromUtilites';
import ResourcesTable from '../resources/ResourcesTable';
import ExpensesTable from '../Expenses/ExpensesTable';

const structureOptions=(propsData)=>{
    let resultOptions=[]
    const { options, keys,idKey}=propsData
    if(options && options.length>0 && keys.length === 1 ){
        resultOptions=options.map((item)=>{
            return {title: item[keys[0]] ? item[keys[0]] : "", id: item[idKey]}
        })
    }else if(options && options.length>0 && keys.length === 2){
        resultOptions=options.map((item)=>{
            return {title: item[keys[0]] ? item[keys[0]]+" "+ item[keys[1]]: "", id: item[idKey]}
        })
    }
    return resultOptions;
}

const MileStoneTabel=(propsData)=>{
    const { data,saveMileStone, dispatch }=propsData
    const columns = [
        { title: 'Milestone Name', field: 'mileStoneName',width:120 },
        { title: 'Work Completion(%)', field: 'workComplete', width:90 },
        { title: 'Invoice Amount(%)', field: 'invoiceAmount', width:80 }
    ]
    return <div style={{ maxWidth: "100%", marginBottom:"18px" }}>
    <MaterialTable
      title="Milestone Managment"
      columns={columns}
      data={data.length > 0 ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        pageSize:5,
        search: false,
        actionsColumnIndex:-1,
      }}
      actions={[
        {
          icon: () =><div><Button variant="contained" color="primary">Save MilesStone</Button></div>,
          onClick: (event, rowData) => { 
              let totalWorkCompetion = data.length >0 && data.reduce((sum,item)=>{ return sum+ parseInt(item.workComplete); }, 0)
              let totalInvoiceAmount=data.length >0 && data.reduce((sum,item)=>{ return sum+ parseInt(item.invoiceAmount); }, 0)
              if(totalInvoiceAmount === 100 && totalWorkCompetion === 100){
                console.log("result = ",totalWorkCompetion,totalInvoiceAmount);
              }else{
                dispatch(loadMessage("error","Please check total of milestone configrations"))
              }
            },
            isFreeAction: true,
            tooltip: 'Save MileStone'
          }
      ]}
      icons={{  Add: () => <Button variant="contained" color="secondary">Add</Button> }}
      editable={{
        isEditable: rowData => false,
        isEditHidden: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData => {
          return new Promise(async (resolve, reject) => {
            if (newData && (Object.keys(newData).length > 1 && newData.constructor === Object)) {
              await saveMileStone([...data,newData])
              await resolve();
            } else {
              dispatch(loadMessage("error","Please check the provided fileds"))
              reject();
            }
          })
        },
        onRowUpdate: (newData, oldData) => { },
        onRowDelete: oldData => { }
      }}
    />
  </div>
}

const PayablesCheckbox=(propsData)=>{
  return <div style={{ maxWidth: "100%", marginBottom:"18px" }}>
    <Field name="employed" component={renderMatiralCheckbox} label="Employed"/>
  </div>
}

//this method will used for load the resource tab
const LoadResourcesTab = (propsData) => {
  const { props }=propsData
  const { initialValues } = props.mainProps
  const { projectBillingType }=(props.mainProps.form.ProjectForm && props.mainProps.form.ProjectForm.values) ? props.mainProps.form.ProjectForm.values : ""
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  return <ResourcesTable projectId={projectId} disableResourceModel={projectBillingType === "Milestone"} stateData={props.mainProps.stateData} />
}

// this method will used for the load the expense tab
const LoadExpensesTab = (propsData) => {
  const { props }=propsData
  const { initialValues } = props.mainProps
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  return <ExpensesTable projectId={projectId} stateData={props.mainProps.stateData} />
}


const LoadBillingModelTab=(propsData)=>{
  const { props}=propsData
  const { values }=props.mainProps.form.ProjectForm
  const { showTabs}=props.mainProps.stateData
  switch ( showTabs && values && values.projectBillingType) {
      case "Milestone":
          return MilestoneTab(props)           
      default:
          return <h3>Select Proper Billing Type</h3>
  }
}

const MilestoneTab=(propsData)=>{
  const { dispatch }=propsData.mainProps
  const [milestoneData, setMilestoneData] = useState([])
  return <MileStoneTabel
      dispatch={dispatch}
      data={milestoneData} 
      saveMileStone={setMilestoneData}
  />
}

export{
    structureOptions,
    MileStoneTabel,
    PayablesCheckbox,
    LoadResourcesTab,
    LoadExpensesTab,
    LoadBillingModelTab
}