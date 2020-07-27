import React,{useState} from 'react';
import { Dialog, Button, Slide, DialogTitle, DialogActions, List, ListItem, Typography, makeStyles, DialogContentText, DialogContent } from '@material-ui/core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
    const { ResourceList }=props
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

      // creating columns
  const columns = [
    { title: 'Emp\u00a0Id', field: 'empId', width: 20 },
    { title: 'Name', field: 'name' },
    { title: 'Domain', field: 'domain' },
    { title: 'Category', field: 'category' },
    { title: 'Experience', field: 'experience' },
    { title: 'Skill', field: 'skill' },
    { title: 'Onboarding\u00a0Date', field: 'name' },
    { title: 'Exit\u00a0Date', field: 'clientName' },
  ];

  // Creating rows
  const data = (ResourceList && ResourceList.length > 0) && ResourceList.map((item, key) => {
    return { "key": (key + 1), "data": item, "projectName": item.projectName, "clientName": item.clientName }
  });
    
return <>
        {LoadAddResourceModel({open,handleClose})}
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Resources Managment"
              columns={columns}
              data={(data && data.length > 0) ? data : []}
              options={{
                headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
              }}
              actions={[
                {
                  icon: () => <Button variant="contained" color="primary">Assign Resource</Button>,
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
    return <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
    <AppBar className={classes.appBar} style={{float: "right"}}>
      <Toolbar >
        <IconButton classes={{ paper: classes.profileMenu }} color="inherit" onClick={handleClose} aria-label="close"> <CloseIcon  /> </IconButton>
        <DialogTitle>Adding Resources</DialogTitle>
      </Toolbar>
    </AppBar>
    <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
                <h1>Dialog Content</h1>
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => console.log("Called the Saving Resources")} color="secondary">Delete</Button>
    </DialogActions>
  </Dialog>
}



const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ResourcesTable);