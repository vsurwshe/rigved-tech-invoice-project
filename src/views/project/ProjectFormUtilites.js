import React,{ useState } from 'react';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Field } from 'redux-form';
import { loadMessage } from "../../redux/actions/ClientAction"
import { renderMatiralCheckbox } from '../utilites/FromUtilites';
import ResourcesTable from '../resources/ResourcesTable';
import ExpensesTable from '../Expenses/ExpensesTable';
import { CheckBox, CheckBoxOutlineBlankOutlined } from '@material-ui/icons';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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
    const { operation }=mainProps.stateData
    const { mileStoneListProjectId }=mainProps.BillingModelState
    const [load, setLoad] = useState(false)
    const columns = [
        { title: "", field: "id", hidden: true },
        { title: 'Milestone\u00a0Name', field: 'mileStoneDesc'},
        { title: 'Work\u00a0Completion(%)', field: 'workComPer'},
        { title: 'Invoice(%)', field: 'invoicePer'},
        { title: 'Expected\u00a0of\u00a0Completion Date', 
          field: 'expComDate', 
          editable:'onUpdate',
          width:80 ,
          editComponent: props => {
            return renderTextField({ name: "expComDate", label: "", type: "date", action: { props } })
          },
          render: (rowData)=> {
            const { expComDateModify }=rowData
            return (mileStoneListProjectId && mileStoneListProjectId.length >0 && rowData.expComDate) ? new moment(rowData.expComDate).format('YYYY-MM-DD'): expComDateModify;
          }
        },
        { title: 'Actual\u00a0Complete\u00a0Date', 
          field: 'actualComDate', 
          editable:'onUpdate',
          editComponent: props => {
            return renderTextField({ name: "actualComDate", label: "", type: "date", action: { props } })
          },
          render: (rowData)=> {
            const { actualComDateModify }=rowData
            return (mileStoneListProjectId && mileStoneListProjectId.length >0 && rowData.actualComDate) ? new moment(rowData.actualComDate).format('YYYY-MM-DD'): actualComDateModify;
          }
        },
        {
          title: "Milestone\u00a0Complete",
          field: 'compFlag', 
          editable: "onUpdate",
          editComponent: props => {
            const { compFlag }=props.rowData
            return  <Checkbox checked={compFlag} inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={(event)=>{
                var data = { ...props.rowData };
                data.compFlag=event.target.checked;
                props.onRowDataChange(data);
              }}/>
          },
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
      data={mileStoneListProjectId.length > 0 ? mileStoneListProjectId : data}
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
          tooltip: 'Save MileStone'}
      ]}
      icons={{  
        Add: () =>(operation && operation !== FromActions.VI)? <Button variant="contained" color="secondary">Add</Button>:"", 
        Edit: () => { return !(mileStoneListProjectId && mileStoneListProjectId.length <=0) && <CreateIcon variant="contained" color="primary" /> },
        Delete: () => { return (mileStoneListProjectId && mileStoneListProjectId.length <=0) && <DeleteOutlineIcon variant="contained" color="secondary" /> },
      }}
      editable={{
        isEditable: rowData => true,
        isDeletable: rowData => true,
        onRowAdd: newData => onMileStoneTabelRowAdd({data, newData, dispatch, saveMileStone, projectId}),
        onRowUpdate: (newData, oldData) => updateMileStoneTabelRecord({newData,oldData,dispatch,"mainProps":propsData.mainProps}),
        onRowDelete: oldData => deleteMileStoneTabelRecord({oldData, data, saveMileStone})
      }}
    />
  </div>
}

// this method will used for the add row in table
const onMileStoneTabelRowAdd=(props)=>{
  const { data, newData, dispatch, saveMileStone, projectId }=props
  return new Promise(async (resolve, reject) => {
    if (newData && (Object.keys(newData).length >= 4 && newData.constructor === Object)) {
      let modifyNewData={
        ...newData,
        projectId,
        compFlag:false, 
        "active": true,
      }
      await saveMileStone([...data,modifyNewData])
      await resolve();
    } else {
      dispatch(loadMessage("error","Please check the values provided in fileds"))
      reject();
    }
  })
}

// this method will help to update milestone table single record
const updateMileStoneTabelRecord=(propsData)=>{
  const { newData, dispatch }=propsData
  const { udpateMileStoneData, GetMileStoneListProjectId }=propsData.mainProps.BillingModelAction
  const { authorization }=propsData.mainProps.LoginState
  return new Promise(async (resolve, reject) => {
    console.log("New ",newData,Object.keys(newData).length)
    if (newData && Object.keys(newData).length >= 8 && newData.compFlag && newData.expComDate <= newData.actualComDateModify && newData.id) {
      let modifyNewData={
        ...newData,
        "active": true,
        "actualComDate": new moment(newData.actualComDateModify+' 00:00','YYYY-MM-DD HH:mm').format('x')
      }
      await udpateMileStoneData(modifyNewData, authorization);
      setTimeout(async () => {
        await GetMileStoneListProjectId(0, 20, newData.projectId, authorization);
        resolve();
      }, API_EXE_TIME)
    } else { dispatch(loadMessage("error","Please check the values provided in fileds")); reject(); }
  })
}

// this method will used to delete record form milestoen tabel
const deleteMileStoneTabelRecord=(propsData)=>{
  const { oldData, data, saveMileStone }=propsData
  return new Promise(async(resolve, reject) => {
    if(data && data.length >=0){
      let filterData= data.filter(item=> item.mileStoneDesc !==oldData.mileStoneDesc && item.expComDateModify !==oldData.expComDateModify )
      await saveMileStone(filterData);
      await resolve();
    }else{ reject(); }
   })
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
    dispatch(loadMessage("error","Please check total of milestones configrations"))
  }
}

// this method will used for the load milestone table
const FixedTypeTabel=(propsData)=>{
  const { data,saveMileStone, dispatch, mainProps, projectId, load }=propsData
  const { operation }=mainProps.stateData
  // this list of colums
  const columns = [
      { title: "", field: "id", hidden: true },
      { title: 'Fixed\u00a0Amount', field: 'amount' },
      { title: 'Start\u00a0Date', 
        field: 'startDate', 
        width:80 ,
        editComponent: props => {
          return renderTextField({ name: "startDate", label: "", type: "date", action: { props } })
        },
        render: (rowData)=> {
          const { startDate }=rowData
          return startDate  ? new moment(startDate).format("YYYY-MM-DD"):""
        }
      }
  ]
  return <div style={{ maxWidth: "100%", marginBottom:"18px" }}>
  <MaterialTable
    title="Fiexd Cost Managment"
    columns={columns}
    data={data.length > 0 ? data : []}
    isLoading={load}
    options={{
      headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
      pageSize:5,
      search: false,
      actionsColumnIndex:-1,
    }}
    icons={{  
      Add: () =>(operation && operation !== FromActions.VI)? <Button variant="contained" color="secondary">Add</Button>:"", 
      Edit: () => { return <CreateIcon variant="contained" color="primary" /> },
    }}
    editable={{
      isEditable: rowData => true,
      isDeletable: rowData => false,
      isDeleteHidden: rowData => true,
      onRowAdd: newData => onFixedTypeTabelRowAdd({data, newData, dispatch, saveMileStone, projectId, "mainProps":propsData.mainProps}),
      onRowUpdate: (newData, oldData) => updateFixedTypeTabelRecord({newData,oldData,dispatch,"mainProps":propsData.mainProps}),
      onRowDelete: oldData => { }
    }}
  />
</div>
}

// this method will used for the add row in table
const onFixedTypeTabelRowAdd=(props)=>{
  const { newData, dispatch, projectId, mainProps }=props
  const { getFixedTypeListProjectId, saveFixedTypeData}=mainProps.BillingModelAction
  const { authorization }=mainProps.LoginState
  return new Promise(async (resolve, reject) => {
    if (newData && (Object.keys(newData).length >= 2 && newData.constructor === Object)) {
      let modifyNewData={
        ...newData,
        projectId,
        "billingType": "Fixed Type", 
        "active": true,
        "startDate": new moment(newData.startDate+' 00:00','YYYY-MM-DD HH:mm').format('x'),
        "formula": ""
      }
      await saveFixedTypeData(modifyNewData,authorization);
      setTimeout(async()=>{
        await getFixedTypeListProjectId(0,100,projectId,authorization);
        await resolve();
      },API_EXE_TIME)
    } else {
      dispatch(loadMessage("error","Please check the values provided in fileds"))
      reject();
    }
  })
}

// this method will help to update milestone table single record
const updateFixedTypeTabelRecord=(propsData)=>{
  const { newData, dispatch, mainProps }=propsData
  const { getFixedTypeListProjectId, saveFixedTypeData}=mainProps.BillingModelAction
  const { authorization }=mainProps.LoginState
  return new Promise(async (resolve, reject) => {
    if (newData) {
      let modifyNewData={
        ...newData,
        "startDate": new moment(newData.startDate+' 00:00','YYYY-MM-DD HH:mm').format('x'),
      }
      await saveFixedTypeData(modifyNewData,authorization);
      setTimeout(async()=>{
        await getFixedTypeListProjectId(0,100,newData.projectId,authorization);
        await resolve();
      },API_EXE_TIME)
    } else { dispatch(loadMessage("error","Please check the values provided in fileds")); reject(); }
  })
}

// ----------------------------------------------------------------------------

// this method will used for the loading milestone tab
const MilestoneTab=(propsData)=>{
  const { projectId }=propsData
  const { dispatch }=propsData.data.mainProps
  const { authorization }= propsData.data.mainProps.LoginState ? propsData.data.mainProps.LoginState :[]
  const { mileStoneListProjectId }= propsData.data.mainProps.BillingModelState ? propsData.data.mainProps.BillingModelState :[]
  const { GetMileStoneListProjectId }= propsData.data.mainProps.BillingModelAction ? propsData.data.mainProps.BillingModelAction :[]
  const [milestoneData, setMilestoneData] = useState([])
  const [callMileStoneCount, setCallMileStoneCount] = useState(0)
  let extisMileStoneByProjectId= (mileStoneListProjectId && mileStoneListProjectId.length >0) && mileStoneListProjectId.filter(item=> item.projectId === projectId)
  if((extisMileStoneByProjectId === false || extisMileStoneByProjectId.length <= 0) && callMileStoneCount === 0 && projectId){
    getMileStoneListByProjectId({authorization,projectId,setCallMileStoneCount,callMileStoneCount,setMilestoneData,GetMileStoneListProjectId, mileStoneListProjectId})
  }else if(milestoneData.length <=0 && extisMileStoneByProjectId.length >0){ 
    setMilestoneData(extisMileStoneByProjectId)
  }
  return <MileStoneTabel
      dispatch={dispatch}
      data={milestoneData} 
      saveMileStone={setMilestoneData}
      projectId={projectId}
      mainProps={propsData.data.mainProps}
  />
}

// this method will help to get milestone accroding to project id
const getMileStoneListByProjectId=async({authorization,projectId,callMileStoneCount,setCallMileStoneCount,setMilestoneData,GetMileStoneListProjectId, mileStoneListProjectId})=>{
  await setCallMileStoneCount(callMileStoneCount + 1)
  await GetMileStoneListProjectId(0, 100, projectId, authorization);
  (mileStoneListProjectId && mileStoneListProjectId.length > 0) && await setMilestoneData(mileStoneListProjectId.filter(item => item.projectId === projectId))
  return "";
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
      disableResourceModel={projectBillingType === "Mile Stone" || projectBillingType === "Fixed Rate"} 
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

// this will load the fixed type billing model
let FixedTypeTab=(propsData)=>{
  const { projectId }=propsData
  const { dispatch }=propsData.data.mainProps
  const { authorization }= propsData.data.mainProps.LoginState ? propsData.data.mainProps.LoginState :[]
  const { fixedTypeListProjectId }= propsData.data.mainProps.BillingModelState ? propsData.data.mainProps.BillingModelState :[]
  const { getFixedTypeListProjectId }= propsData.data.mainProps.BillingModelAction ? propsData.data.mainProps.BillingModelAction :[]
  const [load, setLoad] = useState(false)
  const [callFixedTypeCount, setCallFixedTypeCount] = useState(0)
  let exitsFixedTypeProjectList= (fixedTypeListProjectId && fixedTypeListProjectId.length >0) && fixedTypeListProjectId.filter(item=> item.projectId === projectId)
  if((exitsFixedTypeProjectList === false || exitsFixedTypeProjectList.length <= 0) && callFixedTypeCount === 0 ){
    setCallFixedTypeCount(callFixedTypeCount+1);
    getFixedTypeListByProjectId({ authorization, projectId, callFixedTypeCount, setCallFixedTypeCount, getFixedTypeListProjectId, fixedTypeListProjectId, setLoad })
  }
  return <FixedTypeTabel
      dispatch={dispatch}
      data={fixedTypeListProjectId} 
      projectId={projectId}
      mainProps={propsData.data.mainProps}
      load={load}
  />
}

// this method will help to get fixed type accrdoing to project id
const getFixedTypeListByProjectId=async({authorization, projectId, getFixedTypeListProjectId, setLoad})=>{
    await setLoad(true);
    await getFixedTypeListProjectId(0,100,projectId, authorization)
    await setLoad(false);
}

// this method will used for the load billing model accroding to project type
const LoadBillingModelTab=(propsData)=>{
  const { props }=propsData
  const { initialValues } = props.mainProps
  const { values }=props.mainProps.form.ProjectForm
  const { showTabs}=props.mainProps.stateData
  let projectId = initialValues ? initialValues.id : (props.mainProps.ProjectState.projectDetails && props.mainProps.ProjectState.projectDetails.Id)
  switch ( showTabs && values && values.projectBillingType) {
      case "Mile Stone":
        return <MilestoneTab data={props} projectId={projectId} />           
      case "Fixed Rate":
        return <FixedTypeTab data={props} projectId={projectId} />          
      default:
          return <h3>Select Proper Billing Type</h3>
  }
}

// this is render the text fileds in tables
const renderTextField = (props) => {
  const { name, label, type, action } = props
  const { value }=action.props
  return <TextField
    id={name}
    label={label}
    type={type}
    value={value && value }
    onChange={e => action.props.onChange(e.target.value)}
    InputLabelProps={{ shrink: true }}
    required={true}
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