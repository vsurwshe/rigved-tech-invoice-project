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

class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = { 
            load: false,
            profileImageUpload:false,
            profileImageUrl:"",
        }
    }

    componentDidMount=async()=>{
        console.log("Props ",this.props, this.props.MasterDataAction)
        const { authorization }=this.props.LoginState;
        const { Domains,SkillSet,RoleList}=this.props.MasterDataSet;  
        const { GetDomains,GetSkillSet, GetRoleList}=this.props.MasterDataAction;
        await this.handleLoadValue();
        (Domains && Domains.length === 0 ) && await GetDomains(0,20,authorization)
        (SkillSet && SkillSet.length === 0 ) && await GetSkillSet(0,20,authorization)
        (RoleList && RoleList.length === 0 ) && await GetRoleList(0,20,authorization)
        await this.handleLoadValue();
    }

    handleLoadValue=()=>{ this.setState({ load : ! this.state.load })}

    handleProfileImageValue=()=>{ this.setState({ profileImageUpload : !this.state.profileImageUpload})}
    
    render() { 
        const { load }=this.state
        return load ? this.loadingCircle() : this.loadRegisterForm();
    }

    loadRegisterForm=()=>{
        const { common_message, color }=this.props.LoginState
        const { profileImageUpload,profileImageUrl}=this.state
        const data={ profileImageUpload, profileImageUrl }
        return <Card>
        <center><h1>Register User</h1></center>
        {common_message && <Alert severity={color} >{common_message}</Alert>}
        <RegsiterForm stateData={data} profileImageUploadMethod={this.uploadProfileImageFile} clearFile={this.clearFileUrl}
        RegisterUser={(values) => { this.RegisterUser(values) }} />
    </Card>
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
    loadingCircle = () => <center> <h3>Register</h3> <CircularProgress size={80} /> </center>

    RegisterUser = async(sendUserValues, props) => {
        const { profileImageUrl }=this.state
        const { loadMessage }=this.props
        const { }=this.props
        const newUserData={
            ...sendUserValues,
            "profilePic": profileImageUrl,
            "companyName": "RVTech Pvt Ltd"
        }
        // await RegisterUser(newUserData, props.LoginState.authorization)
        // setTimeout(async () => {
        //     await loadMessage()
        // }, API_EXE_TIME)
    }
    
}

const mapStateToProps = state => { return state; };
// const mapDispatchToProps = (dispatch) => ({
//     MasterDataSetAction : bindActionCreators(MasterDataSetAction,dispatch)
// })
const mapDispatchToProps = (dispatch) => ({
    LoginActions: bindActionCreators(LoginActions, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch),
    FileAction: bindActionCreators(FileAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);

// let Register =(props) => {
//     var classes = useStyles();
//     const { common_message, color, authorization }=props.LoginState
//     const { Domains,SkillSet,SkillCategory}=props.MasterDataSet   
//     const { GetDomains,GetSkillSet}=props.MasterDataSetAction   
//     console.log("Register ",props)
//     return <Card>
//          {LoadDataRegsiterFromData({Domains,GetDomains,SkillSet,GetSkillSet, authorization})}
//         <center><h1>Register User</h1></center>
//         {common_message && <Alert severity={color} >{common_message}</Alert>}
//         <RegsiterForm classes={classes}  Domains={Domains} Skills={SkillSet} SkillCategory={SkillCategory} RegisterUser={(values) => { RegisterUser(values, props) }} />
//     </Card>
// }

// const LoadDataRegsiterFromData=async(props)=>{
//     (props.Domains && props.Domains.length <=0 ) && await props.GetDomains(0,20,props.authorization)
//     (props.SkillSet && props.SkillSet.length <=0 ) && await props.GetSkillSet(0,20,props.authorization)
//     return '';
// }

// const RegisterUser = async(sendUserValues, props) => {
//     const { loadMessage }=props
//     const newUserData={
//         ...sendUserValues,
//         "profilePic": sendUserValues.profilePic.name,
//         "companyName": "RVTech Pvt Ltd"
//     }
//     await props.RegisterUser(newUserData, props.LoginState.authorization)
//     setTimeout(async () => {
//         await loadMessage()
//     }, API_EXE_TIME)
// }


