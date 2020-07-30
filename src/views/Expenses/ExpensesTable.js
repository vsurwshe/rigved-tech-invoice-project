import React,{useState} from 'react';
import { connect } from "react-redux";
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from '@material-ui/core';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import * as ExpenseAction from "../../redux/actions/ExpensesAction";
import * as FileAction from "../../redux/actions/FileAction";
import moment from 'moment';
import { bindActionCreators } from 'redux';

const ExpensesTable = (props) => {
  const { projectId }=props 
  const { operation }=props.stateData
  const [countCall,setCountCall]=useState(0)
  const { expensesListByProjectId}=props.ExpenseState
  const { SaveExpenseRecord, GetExpensesListByProjectId } = props.ExpenseAction
  const { ExpenseTypeList }=props.MasterDataSet
  const { authorization }=props.LoginState
  
  let expenseTypeListOptions= ExpenseTypeList.length >0 && ExpenseTypeList.map((item,key)=>{return{title:item.name,id:item.id}})
  let exitsExpensesListByProjectId=(expensesListByProjectId && expensesListByProjectId.length > 0)&& expensesListByProjectId.filter(item=> item.projectId ===projectId);

  if((exitsExpensesListByProjectId === false || exitsExpensesListByProjectId.length <=0) && countCall===0){
    setCountCall(countCall + 1)
    GetExpensesListByProjectId(0,20,projectId,authorization);
    exitsExpensesListByProjectId=(expensesListByProjectId && expensesListByProjectId.length > 0)&& expensesListByProjectId.filter(item=> item.projectId ===projectId);
  }

  // creating columns
  const columns = [
    { title: "Attatchment",
      field:'attachmentUrl',
      editComponent: dataProps=>{
      return (props.FileState && props.FileState.fileUrl && props.FileState.fileUrl.length > 0 ) ?<h5>{loadFileUrlName(props.FileState.fileUrl[0])}</h5> 
            :<TextField 
                type="file"
                onChange={event => ExpenseFileUpload(event,dataProps)}
                InputLabelProps={{ shrink: true }}
            /> 
      }
    },
    { title: 'Expense\u00a0Type', 
      field: 'expType', 
      editComponent: props => {
        return <Autocomplete
        id="exp-type"
        autoHighlight
        options={(expenseTypeListOptions && expenseTypeListOptions.length >0) ? expenseTypeListOptions: []}
        getOptionLabel={expenseTypeListOptions => (expenseTypeListOptions && expenseTypeListOptions.title) && expenseTypeListOptions.title}
        onChange={(event, value) => value && props.onChange(value.id)}
        renderInput={(params) => ( <TextField {...params} label="Expense Type" margin="normal"  /> )}
      /> 
      }
    },
    { title: 'Description',
      field: 'description',
      editComponent: props=>{
        return <TextField
              id="description"
              multiline
              label="Description"
              type="text"
              rows={1}
              onChange={e => props.onChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
          />
      } 
    },
    { title: 'Amount', 
      field: 'amount',
      editComponent: props=>{
        return <TextField
              id="amount"
              label="Amount"
              type="number"
              onChange={e => props.onChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
          />
      }
    },
    { title: 'Date', 
      field: 'expDate',
      editComponent: props=>{
        return <TextField
              id="expDate"
              label="Expense Date"
              type="date"
              onChange={e => props.onChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
          />
      }
    }
  ];

  const loadFileUrlName=(fileUrl)=>{
    let fileArray=fileUrl.split("\\");
    return fileArray.length > 0 ? fileArray[5]: "";
  }

  const ExpenseFileUpload=async (event,props)=>{
    let imageFile = event.target.files[0];
    if (imageFile) {
      var reader = new FileReader();
      reader.onload =async()=>{
        let byteArray=reader.result.split(",")
        let fileArray=imageFile.name.split(".");
        let fileName=(fileArray && fileArray.length >0) &&  fileArray[0];
        CallFileUpload(byteArray.length >0 && byteArray[1],fileName,imageFile.type)
      };
      reader.onerror = function (error) { console.log('Error: ', error); };
      await reader.readAsDataURL(imageFile);
    }
  }

  const CallFileUpload=async(fileData,fileName,fileType)=>{
      const { SaveFileDetails }= props.FileAction
      const { authorization } = props.LoginState
      let newFileData=[{
        "fileName":fileName,
	      "description":"ExpenseDetail",
	      "contentType":"pdf",
	      "content":`${fileData}`
      }]
       await SaveFileDetails (newFileData, authorization)
       return '';
  }

  // Creating rows
  let data =(exitsExpensesListByProjectId && exitsExpensesListByProjectId.length > 0 ) && exitsExpensesListByProjectId.map((item, key) => {
    let tempData=(item && item.List.length>0) && item.List.map((subitem,key)=>{
      return  { 
        "data": subitem, 
        "amount":subitem.amount,
        "description":subitem.description,
        "expType":subitem.expType && subitem.expType.name, 
        "expDate":moment(subitem.expDate).format('YYYY-MM-DD'),
        "attachmentUrl":loadFileUrlName(subitem.attachmentUrl)
      }
    }) 
    return (tempData && tempData.length >0 )? tempData : [];
  });

  return <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title=""
      columns={columns}
      data={(data && data.length > 0) ? data[0] : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        search: false
      }}
      icons={{Add: () => {return (operation && (operation === FromActions.ED || operation === FromActions.CR)) ? <Button variant="contained" color="primary">Add Expense</Button> : ""}}}
      editable={{
        isEditable: rowData => false, 
        isEditHidden: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData =>{
          return new Promise(async(resolve, reject) => {
            const { SaveFileData }= props.FileAction
            let newExpenseData={
              ...newData,
              "active":true,
              "project":{ "id":projectId },
              "expType":{ "id":newData.expType},
              "attachmentUrl":  (props.FileState && props.FileState.fileUrl && props.FileState.fileUrl.length > 0 ) ? props.FileState.fileUrl[0] :""
            }
            await SaveExpenseRecord([newExpenseData],authorization);
            setTimeout(async()=>{
              await GetExpensesListByProjectId(0,20,projectId, authorization)
              await SaveFileData();
              resolve();
            },API_EXE_TIME)
        })},
        onRowUpdate: (newData, oldData) =>{},
        onRowDelete: oldData =>{}
      }}
    />
  </div>
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
  ExpenseAction: bindActionCreators(ExpenseAction, dispatch),
  FileAction : bindActionCreators(FileAction,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
