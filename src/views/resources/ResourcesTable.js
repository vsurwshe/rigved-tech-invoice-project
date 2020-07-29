import React,{useState, forwardRef } from 'react';
import { Dialog, Button, Slide, DialogTitle, DialogActions, makeStyles, DialogContent, Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as EmployeeAction from "../../redux/actions/EmployeeAction";
import * as ClientAction from "../../redux/actions/ClientAction"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FromActions } from '../../assets/config/Config';
import { bindActionCreators } from 'redux';
import ResourceRateCardTable from "./ResourceRateCardTable";

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    profileMenuIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.hint,
    }
}));
  
// this method will used for the transition for model 
const Transition = forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });

let ResourcesTable=(props)=>{
    const { projectId }=props
    const { clientId }=(props.form && props.form.ProjectForm &&props.form.ProjectForm.values) ? props.form.ProjectForm.values : ""
    const { GetEmployeeListByProjectId,}=props.EmployeeAction
    const { GetClientDetailsById }=props.ClientAction
    const { employeeListByPojectId }=props.EmpolyeeState
    const { operation }=props.stateData
    const { authorization}=props.LoginState
    const [open, setOpen] = useState(false);
    const [countCall,setCountCall]=useState(0)
    const [countCallRateCard,setCountRateCardCall]=useState(0)
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    let exitsEmployeeListByPojectId=(employeeListByPojectId && employeeListByPojectId.length > 0)&& employeeListByPojectId.filter(item=> item.projectId ===projectId);
    
    // this codition will check the passed project id realted employee is there or not
    if((exitsEmployeeListByPojectId === false || exitsEmployeeListByPojectId.length <=0) && countCall===0){
      setCountCall(countCall + 1)
      GetEmployeeListByProjectId(0,20,projectId,authorization);
      exitsEmployeeListByPojectId=(employeeListByPojectId && employeeListByPojectId.length > 0)&& employeeListByPojectId.filter(item=> item.projectId ===projectId);
    }

    // this codition get the client details by client id
    if(countCallRateCard === 0 && clientId){
      setCountRateCardCall(countCallRateCard+1);
      GetClientDetailsById(clientId,authorization)
    }

    // creating columns
    const columns = [
      { title: 'Emp\u00a0Id', field: 'employeeNumber', width: 20 },
      { title: 'Name', field: 'name' },
      { title: 'Domain', field: 'designation' },
      { title: 'Category', field: 'category' },
      { title: 'Experience', field: 'experience' },
      { title: 'Skill', field: 'skill' },
      { title: 'Onboarding\u00a0Date', field: 'name' },
      { title: 'Exit\u00a0Date', field: 'clientName' },
    ];

  // Creating rows
  let data =(exitsEmployeeListByPojectId && exitsEmployeeListByPojectId.length > 0 ) && exitsEmployeeListByPojectId.map((item, key) => {
    let tempData=(item && item.List.length>0) && item.List.map((subitem,key)=>{
      return  { "data": subitem, "employeeNumber":subitem.employeeNumber, "name":subitem.firstName+" "+subitem.lastName, }
    }) 
    return (tempData && tempData.length >0 )? tempData : [];
  });
    
return <> {LoadAddResourceModel({open,handleClose, "mainProps":props})}
  <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title=""
        columns={columns}
        data={(data && data.length > 0) ? data[0] : []}
        options={{
          headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
          search: false
        }}
        actions={[
          { icon: () => {return (operation && (operation === FromActions.ED || operation === FromActions.CR)) ?  <div><Button variant="contained" color="primary">Assign Resource</Button></div> : ""},
            onClick: (event, rowData) => { handleClickOpen() },
            isFreeAction: true,
            tooltip: 'Assign Resource'
          }
        ]}
      />
  </div>
</>
}

// this method will used for the loading add resource model
const LoadAddResourceModel=(data)=>{
    const classes = useStyles();
    const { open, handleClose}=data
    const [listOfEmployeeAccount,setEmployeeAccount]=useState([]);
    const [selectedRateCard,setSelectedRateCard]=useState([]);
    const [load,setLoad]=useState(false);
    return <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
    <AppBar className={classes.appBar} style={{float: "right"}}>
      <Toolbar >
        <IconButton classes={{ paper: classes.profileMenu }} color="inherit" onClick={handleClose} aria-label="close"> <CloseIcon  /> </IconButton>
        <DialogTitle>Adding Resources</DialogTitle>
      </Toolbar>
    </AppBar>
    <DialogContent>
      { load ? loadingCircle() :<><Grid container spacing={3}>
            <Grid item  xs={8} style={{ paddingLeft: 30, paddingTop:20 }}>
                {LoadRateCardList({"mainProps":data.mainProps,selectedRateCard,setSelectedRateCard})}
            </Grid>
            <Grid item  xs={4} style={{paddingTop:50}}>
                {LoadEmployeeList({"mainProps":data.mainProps,listOfEmployeeAccount,setEmployeeAccount})}
            </Grid>
        </Grid></>
      }
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="primary">Cancle</Button>
        <Button onClick={() =>loadAssignResource({listOfEmployeeAccount, selectedRateCard,"mainProps":data.mainProps,load,setLoad,handleClose})} color="secondary">Assign Resource</Button>
    </DialogActions>
  </Dialog>
}

// this method will used for the loading assign resource
const loadAssignResource=(data)=>{
  const { listOfEmployeeAccount, selectedRateCard,setLoad,load,handleClose}=data
  const { projectId }=data.mainProps
  const { authorization}=data.mainProps.LoginState
  const { SaveEmployeeRecord,GetEmployeeListByProjectId }=data.mainProps.EmployeeAction
  let accountList=(listOfEmployeeAccount && listOfEmployeeAccount.length >0) && listOfEmployeeAccount.map((item,key)=>item.id)
  let newResourceData={
    "accountIdList":accountList,
    "projectId":projectId,
    "rateCardId":selectedRateCard.rateCardId,
    "active": 1
  }
  setLoad(true);
  saveAssignResource({newResourceData,load,setLoad, SaveEmployeeRecord,GetEmployeeListByProjectId,authorization,handleClose});
}

// this method will used for calling the save employee record
const saveAssignResource=async(propsData)=>{
  const {newResourceData,setLoad,SaveEmployeeRecord,GetEmployeeListByProjectId,authorization,handleClose }=propsData
  if(newResourceData){
    await SaveEmployeeRecord(newResourceData,authorization);
    await GetEmployeeListByProjectId(0,20,newResourceData.projectId,authorization);
    await setLoad(false);
    await handleClose();
  }
}

// this method will used for the loading circule progress bar
const loadingCircle = () => <center> Saving.... <CircularProgress size={40} /> </center>

// this method will used for the loading employee list
const LoadEmployeeList=(props)=>{
  const { EmployeeList}=props.mainProps.MasterDataSet
  const { listOfEmployeeAccount, setEmployeeAccount}=props
  let options=EmployeeList.length >0 && EmployeeList.map((item,key)=>{return{title:item.firstName+" "+item.lastName,id:item.accountId}});
  return <> <h2>Select the member</h2>
      <Autocomplete
        multiple
        id="tags-outlined"
        filterSelectedOptions
        options={[...listOfEmployeeAccount,...options]}
        value={listOfEmployeeAccount}
        getOptionLabel={(options) => options.title}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event, value) =>value && setEmployeeAccount(value)}
        style={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} fullWidth label="Member Name" />}
      />
  </>
}

// this method will used for the rate card list into material table
const LoadRateCardList=(propsData)=>{
  const { rateCardDtos}= (propsData && propsData.mainProps.ClientState && propsData.mainProps.ClientState.clientDataById) && propsData.mainProps.ClientState.clientDataById
  const { selectedRateCard,setSelectedRateCard }=propsData
  return <><h2>Select Rate Card</h2>
      {rateCardDtos ? <ResourceRateCardTable tableData={rateCardDtos} selectedRateCard={selectedRateCard} setSelectedRateCard={setSelectedRateCard} /> 
      : <h4>There is no rate card assign for this client</h4>}
    </>
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
  EmployeeAction : bindActionCreators(EmployeeAction,dispatch),
  ClientAction: bindActionCreators(ClientAction,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(ResourcesTable);