import React,{ useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Field } from 'redux-form';
import { loadMessage } from "../../redux/actions/ClientAction"
import { renderMatiralCheckbox } from '../utilites/FromUtilites';
import ResourcesTable from '../resources/ResourcesTable';
import ExpensesTable from '../Expenses/ExpensesTable';
import { CheckBox, CheckBoxOutlineBlankOutlined, TextFields } from '@material-ui/icons';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import TextField from '@material-ui/core/TextField';

// this method will used for autocomplete options structure configre into project 
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

// this method will used for the load milestone table
const MileStoneTabel=(propsData)=>{
    const { data,saveMileStone, dispatch, mainProps, projectId }=propsData
    const { operation }=propsData.mainProps.stateData
    const [load, setLoad] = useState(false)
    const columns = [
        { title: "", field: "id", hidden: true },
        { title: 'Milestone Name', field: 'mileStoneDesc',width:120 },
        { title: 'Work Completion(%)', field: 'workComPer', width:90 },
        { title: 'Invoice(%)', field: 'invoicePer', width:80 },
        { title: 'Expected of Completion Date', 
          field: 'expComDate', 
          width:80 ,
          editComponent: props => {
            return renderTextField({ name: "expComDate", label: "", type: "date", action: { props } })
          }
        },
        { title: 'Actual Complete Date', 
          field: 'actualComDate', 
          editable:'onUpdate',
          width:80 ,
          editComponent: props => {
            return renderTextField({ name: "actualComDate", label: "", type: "date", action: { props } })
          }
        },
        {
          title: "",
          width:8,
          editable: "never",
          render: (rowData)=> {
            const { compFlag }=rowData
            return (compFlag ) ? <CheckBox variant="contained" color="primary" />:<CheckBoxOutlineBlankOutlined  variant="contained" color="secondary" onClick={()=>console.log(rowData)} />;
          }
        }
    ]
    return <div style={{ maxWidth: "100%", marginBottom:"18px" }}>
    <MaterialTable
      title="Milestone Managment"
      columns={columns}
      data={data.length > 0 ? data : []}
      isLoading={load}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        pageSize:5,
        search: false,
        actionsColumnIndex:-1,
      }}
      actions={[
        { icon: () =>(operation && operation !== FromActions.VI)? <Button variant="contained" color="primary">Save MileStone</Button>:"",
          onClick: (event, rowData) => saveMileStoneRecord({event, rowData,data, dispatch, "mainProps":mainProps, setLoad, projectId}),
          isFreeAction: true,
          tooltip: 'Save MileStone'
        }
      ]}
      icons={{  Add: () =>(operation && operation !== FromActions.VI)? <Button variant="contained" color="secondary">Add</Button>:"" }}
      editable={{
        isEditable: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData => onTabelRowAdd({data, newData, dispatch, saveMileStone, projectId}),
        onRowUpdate: (newData, oldData) => ({newData,oldData,"mainProps":propsData}),
        onRowDelete: oldData => { }
      }}
    />
  </div>
}

// this method will used for the add row in table
const onTabelRowAdd=(props)=>{
  const { data, newData, dispatch, saveMileStone, projectId }=props
  return new Promise(async (resolve, reject) => {
    if (newData && (Object.keys(newData).length > 1 && newData.constructor === Object)) {
      let modifyNewData={...newData,projectId,compFlag:false}
      await saveMileStone([...data,modifyNewData])
      await resolve();
    } else {
      dispatch(loadMessage("error","Please check the provided fileds"))
      reject();
    }
  })
}

// this method will help to update milestone table single record
const updateMileStoneTabelRecord=(props)=>{

}

// this method will used for the create mile stone 
const saveMileStoneRecord=(props)=>{
  const { data, dispatch, setLoad, projectId }=props
  const { GetMileStoneListProjectId, SaveMileStoneData}=props.mainProps.BillingModelAction
  const { authorization }=props.mainProps.LoginState
  let totalWorkCompetion = data.length >0 && data.reduce((sum,item)=>{ return sum+ parseInt(item.workComPer); }, 0)
  let totalInvoiceAmount=data.length >0 && data.reduce((sum,item)=>{ return sum+ parseInt(item.invoicePer); }, 0)
  if(totalInvoiceAmount === 100 && totalWorkCompetion === 100){
    setLoad(true);
    SaveMileStoneData(data,authorization);
    setTimeout(async()=>{
      await GetMileStoneListProjectId(0,100,projectId,authorization)
      setLoad(false);
    },API_EXE_TIME)
  }else{
    dispatch(loadMessage("error","Please check total of milestone configrations"))
  }
}

// this method will used for the load payables checkbox
const PayablesCheckbox=(propsData)=>{
  return <div style={{ maxWidth: "100%", marginBottom:"18px" }}>
    <Field name="employed" component={renderMatiralCheckbox} label="Employed"/>
  </div>
}

//this method will used for load the resource tab
const LoadResourcesTab = (propsData) => {
  const { props }=propsData
  const { initialValues } = props.mainProps
  const [resource, setResource] = useState([]);
  const { projectBillingType }=(props.mainProps.form.ProjectForm && props.mainProps.form.ProjectForm.values) ? props.mainProps.form.ProjectForm.values : ""
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  return <ResourcesTable 
      projectId={projectId} 
      disableResourceModel={projectBillingType === "Mile Stone"} 
      stateData={props.mainProps.stateData} 
      resource={resource}
      setResource={setResource}
  />
}

// this method will used for the load the expense tab
const LoadExpensesTab = (propsData) => {
  const { props }=propsData
  const { initialValues } = props.mainProps
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  return <ExpensesTable projectId={projectId} stateData={props.mainProps.stateData} />
}

// this method will used for the Loadbilling tab according to billing type
const LoadBillingModelTab=(propsData)=>{
  const { props }=propsData
  const { initialValues } = props.mainProps
  const { values }=props.mainProps.form.ProjectForm
  const { showTabs}=props.mainProps.stateData
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  switch ( showTabs && values && values.projectBillingType) {
      case "Mile Stone":
          return  <MilestoneTab data={props} projectId={projectId} />           
      default:
          return <h3>Select Proper Billing Type</h3>
  }
}

// this is render the text fileds in tables
const renderTextField = (props) => {
  const { name, label, type, action } = props
  return <TextField
    id={name}
    label={label}
    type={type}
    onChange={e => action.props.onChange(e.target.value)}
    InputLabelProps={{ shrink: true }}
    required={true}
  />
}

// this method will used for the loading milestone tab
const MilestoneTab=(propsData)=>{
  const { projectId }=propsData
  const { dispatch }=propsData.data.mainProps
  const { authorization }= propsData.data.mainProps.LoginState ? propsData.data.mainProps.LoginState :[]
  const { mileStoneListProjectId }= propsData.data.mainProps.BillingModelState ? propsData.data.mainProps.BillingModelState :[]
  const { GetMileStoneListProjectId }= propsData.data.mainProps.BillingModelAction ? propsData.data.mainProps.BillingModelAction :[]
  const [milestoneData, setMilestoneData] = useState([])
  if(mileStoneListProjectId && mileStoneListProjectId.length <=0){
      GetMileStoneListProjectId(0,100,projectId,authorization)
      // saveMileStoneData(mileStoneListProjectId);
  }
  return <MileStoneTabel
      dispatch={dispatch}
      data={milestoneData} 
      saveMileStone={setMilestoneData}
      projectId={projectId}
      mainProps={propsData.data.mainProps}
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