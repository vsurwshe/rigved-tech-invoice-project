import React,{useState } from 'react';
import { Dialog, Button, Slide, DialogTitle, DialogActions, makeStyles, DialogContentText, DialogContent, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as EmployeeAction from "../../redux/actions/EmployeeAction";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FromActions } from '../../assets/config/Config';

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
  
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let ResourcesTable=(props)=>{
    const { GetEmployeeListByProjectId, projectId }=props
    const { employeeListByPojectId }=props.EmpolyeeState
    const { operation }=props.stateData
    const { authorization}=props.LoginState
    const [open, setOpen] = useState(false);
    const [countCall,setCountCall]=useState(0)
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    let exitsEmployeeListByPojectId=(employeeListByPojectId && employeeListByPojectId.length > 0)&& employeeListByPojectId.filter(item=> item.projectId ===projectId);
    
    if((exitsEmployeeListByPojectId === false || exitsEmployeeListByPojectId.length <=0) && countCall===0){
      setCountCall(countCall + 1)
      GetEmployeeListByProjectId(0,20,projectId,authorization);
      exitsEmployeeListByPojectId=(employeeListByPojectId && employeeListByPojectId.length > 0)&& employeeListByPojectId.filter(item=> item.projectId ===projectId);
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
      return  { 
        "data": subitem, 
        "employeeNumber":subitem.employeeNumber,
        "name":subitem.firstName+" "+subitem.lastName,
        // "expDate":moment(subitem.expDate).format('YYYY-MM-DD'),
      }
    }) 
    return (tempData && tempData.length >0 )? tempData : [];
  });
    
return <>
        {LoadAddResourceModel({open,handleClose, "mainProps":props})}
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
                { icon: () => {return (operation && (operation === FromActions.ED || operation === FromActions.CR)) ?  <Button variant="contained" color="primary">Assign Resource</Button> : ""},
                  onClick: (event, rowData) => { handleClickOpen() },
                  isFreeAction: true,
                  tooltip: 'Assign Resource'
                }
              ]}
            />
        </div>
</>
}

const LoadAddResourceModel=(data)=>{
    const classes = useStyles();
    const {open, handleClose}=data
    const [listOfEmployeeAccount,setEmployeeAccount]=useState([])

    return <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
    <AppBar className={classes.appBar} style={{float: "right"}}>
      <Toolbar >
        <IconButton classes={{ paper: classes.profileMenu }} color="inherit" onClick={handleClose} aria-label="close"> <CloseIcon  /> </IconButton>
        <DialogTitle>Adding Resources</DialogTitle>
      </Toolbar>
    </AppBar>
    <DialogContent>
       <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30, paddingTop:20 }}>
                {LoadRateCardList(data.mainProps)}
            </Grid>
            <Grid item xs={12} sm={6} style={{paddingTop:50}}>
                {LoadEmployeeList({"mainProps":data.mainProps,listOfEmployeeAccount,setEmployeeAccount})}
            </Grid>
        </Grid>
                
    </DialogContent>
    <DialogActions>
        <Button onClick={() => console.log("Called the Saving Resources")} color="secondary">Delete</Button>
    </DialogActions>
  </Dialog>
}

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


const LoadRateCardList=(propsData)=>{
  return <h2> Rate Card Details </h2>
}


const mapStateToProps = state => { return state; };
export default connect(mapStateToProps,EmployeeAction)(ResourcesTable);