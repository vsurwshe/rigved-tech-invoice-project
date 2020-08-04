import React, {Component} from 'react';
import { Card, CircularProgress } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import RegsiterForm from './RegsiterForm';
import { connect } from 'react-redux';
import * as LoginActions from "../../redux/actions/LoginAction";
import * as MasterDataAction from "../../redux/actions/MasterDataAction"
import * as FileAction from "../../redux/actions/FileAction"
import { loadMessage } from "../../redux/actions/ClientAction"
import { API_EXE_TIME } from '../../assets/config/Config';
import { bindActionCreators } from 'redux';
import RegisterTable from './RegisterTable';

class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = { 
            load: false,
            fromAction:false,
            operation:"",
            userData:[],
            profileImageUpload:false,
            profileImageUrl:"",
        }
    }

    // this method used for the from actions in project 
    handleRegisterFromActions = (userData,operation) => { this.setState({ fromAction: !this.state.fromAction, userData, operation}) }
    
    // this function handle the register table loading value
    handleLoadValue=()=>{ this.setState({ load : ! this.state.load })}

    handleProfileImageValue=()=>{ this.setState({ profileImageUpload : !this.state.profileImageUpload})}
    
    render() { 
        const { fromAction }=this.state
        return fromAction ? this.loadRegisterForm() : this.loadRegisterTable();
    }

    loadRegisterForm=()=>{
        const { common_message, color }=this.props.LoginState
        const { profileImageUpload,profileImageUrl}=this.state
        const data={ profileImageUpload, profileImageUrl }
        return <Card>
        <center><h1>Register User</h1></center>
        {common_message && <Alert severity={color} >{common_message}</Alert>}
        <RegsiterForm 
            stateData={data} 
            loadMethod={this.handleLoadValue}
            profileImageUploadMethod={this.uploadProfileImageFile} 
            clearFile={this.clearFileUrl}
            RegisterUser={(values) => { this.RegisterUser(values) }} 
            cancle={this.handleRegisterFromActions}
        />
    </Card>
    }

    loadRegisterTable=()=>{
        return <RegisterTable
            fromAction={this.handleRegisterFromActions}
        />
    }

    clearFileUrl=()=>{ this.setState({profileImageUrl:""}) }

    uploadProfileImageFile=async(fileData,name,type)=>{
        const {SaveFileDetails, SaveFileData}= this.props.FileAction
        const { authorization } = this.props.LoginState
        let newFileData=[{
            "fileName":name,
	        "description":"ClientDetail",
	        "contentType":'png',
	        "content":`${fileData}`
        }]
        await this.handleProfileImageValue();
        await SaveFileDetails(newFileData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await SaveFileData();
            await this.handleProfileImageValue();
        }, API_EXE_TIME)
        this.setState({profileImageUrl : (this.props.FileState.fileUrl && this.props.FileState.fileUrl.length >0)  && this.props.FileState.fileUrl[0]})
    }

    // this method used for the show circular progress bar 
    loadingCircle = () => <center> <h3>Register.... User..</h3> <CircularProgress size={80} /> </center>

    RegisterUser = async(sendUserValues) => {
        const { profileImageUrl }=this.state
        const { RegisterUserDetails, loadMessage }=this.props.LoginActions
        const { authorization }=this.props.LoginState
        const newUserData={
            ...sendUserValues,
            "profilePic": profileImageUrl,
            "companyName": "RVTech Pvt Ltd"
        }
        this.handleLoadValue()
        await RegisterUserDetails(newUserData, authorization)
        setTimeout(async () => {
            await loadMessage()
            this.clearFileUrl();
            this.handleLoadValue();
        }, API_EXE_TIME)
    }
    
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    LoginActions: bindActionCreators(LoginActions, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch),
    FileAction: bindActionCreators(FileAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);

