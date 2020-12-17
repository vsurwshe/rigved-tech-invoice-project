import React,{ useState } from 'react';
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Field } from 'redux-form';
import { loadMessage } from "../../redux/actions/ClientAction"
import { API_EXE_TIME } from '../../assets/config/Config';
import { renderCheckbox, renderMatiralCheckbox, renderSanckbarAlert } from '../utilites/FromUtilites';

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
      title="Milestone"
      columns={columns}
      data={data.length > 0 ? data : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        pageSize:5,
        search: false,
        actionsColumnIndex:-1,
      }}
      actions={[
        {icon: () =><div><Button variant="contained" color="primary">Save MilesStone</Button></div>,
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
          tooltip: 'Save MileStone'}
      ]}
      icons={{  Add: () => <Button variant="contained" color="secondary">Add</Button> }}
      editable={{
        isEditable: rowData => false,
        isEditHidden: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData => {
          return new Promise(async (resolve, reject) => {
            console.log("Data ",newData, Object.keys(newData).length > 1 && newData.constructor === Object)
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

export{
    structureOptions,
    MileStoneTabel,
    PayablesCheckbox
}