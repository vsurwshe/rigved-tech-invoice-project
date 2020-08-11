import React, { Component } from 'react';
import { Card, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@material-ui/core";
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
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            fromAction: false,
            operation: "",
            userData: [],
            profileImageUpload: false,
            profileImageUrl: "",
            attendanceUpload: false,
            attendanceUrl: "",
            attendanceModel: false,
        }
    }

    componentDidMount = async () => {
        const { SkillSet, RoleList, Domains } = this.props.MasterDataSet
        const { authorization } = this.props.LoginState
        const { GetDomains, GetSkillSet, GetRoleList } = this.props.MasterDataAction
        await this.handleLoadValue();
        if (Domains && Domains.length <= 0) {
            await GetDomains(0, 20, authorization)
        }
        if (SkillSet && SkillSet.length <= 0) {
            await GetSkillSet(0, 20, authorization)
        }
        if (RoleList && RoleList.length <= 0) {
            await GetRoleList(0, 20, authorization)
        }
        await this.handleLoadValue();
    }

    // this method used for the from actions in project 
    handleRegisterFromActions = (userData, operation) => { this.setState({ fromAction: !this.state.fromAction, userData, operation }) }

    // this function handle the register table loading value
    handleLoadValue = () => { this.setState({ load: !this.state.load }) }

    // this handleing the upload to profile image
    handleProfileImageValue = () => { this.setState({ profileImageUpload: !this.state.profileImageUpload }) }

    // this handleing the upload attendance model
    handleAttendanceModel = () => { this.setState({ attendanceModel: !this.state.attendanceModel }) }

    //this method will used for the handling attendance upload
    handleAttendanceUpload = () => { this.setState({ attendanceUpload: !this.state.attendanceUpload }) }

    render() {
        const { fromAction } = this.state
        return fromAction ? this.loadRegisterForm() : this.loadRegisterTable();
    }

    loadRegisterForm = () => {
        const { common_message, color } = this.props.LoginState
        const { profileImageUpload, profileImageUrl } = this.state
        const data = { profileImageUpload, profileImageUrl }
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

    loadAttendanceModel = () => {
        const { attendanceModel, attendanceUrl, attendanceUpload } = this.state
        return <Dialog open={attendanceModel} keepMounted onClose={this.handleAttendanceModel} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"   >
            <DialogTitle id="alert-dialog-slide-title">{'Upload excel attendance file'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {(attendanceUrl === "" || attendanceUrl === undefined) ? (attendanceUpload ? this.loadingCircle("Uploading") : this.loadAttendanceUrl())
                        : <h5>{this.loadFileUrlName(attendanceUrl)}</h5>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleAttendanceModel} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    }

    loadAttendanceUrl = () => <label htmlFor="attendanceFile">
        <input name="attendanceFile" type="file" onChange={event => this.handleAttendanceFileChange(event)} />
    </label>

    loadFileUrlName = (fileUrl) => {
        let fileArray = fileUrl.split("\\");
        return fileArray.length > 0 ? fileArray[5] : "";
    }

    handleAttendanceFileChange = async (event) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        if (imageFile) {
            var reader = new FileReader();
            reader.onload = async () => {
                let byteArray = reader.result.split(",")
                this.uploadAttendanceFile(byteArray.length > 0 && byteArray[1], imageFile.name, imageFile.type)
            };
            reader.onerror = function (error) { console.log('Error: ', error); };
            await reader.readAsDataURL(imageFile);
        }
    }

    loadRegisterTable = () => {
        const { load }=this.state
        return <>
            {this.loadAttendanceModel()}
            {load ? this.loadingCircle("Loading...") 
            : <RegisterTable
                fromAction={this.handleRegisterFromActions}
                handleAttendance={this.handleAttendanceModel}
             />}
        </>
    }

    clearFileUrl = () => { this.setState({ profileImageUrl: "" }) }

    uploadAttendanceFile = async (fileData, name, type) => {
        const { SaveFileDetails, SaveFileData } = this.props.FileAction
        const { authorization } = this.props.LoginState
        let newFileData = [{
            "fileName": name,
            "description": "attendance",
            "contentType": 'xls',
            "content": `${fileData}`
        }]
        await this.handleAttendanceUpload();
        await SaveFileDetails(newFileData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await SaveFileData();
            await this.handleAttendanceUpload();
            await this.handleAttendanceModel();
        }, API_EXE_TIME)
        this.setState({ attendanceUrl: (this.props.FileState.fileUrl && this.props.FileState.fileUrl.length > 0) && this.props.FileState.fileUrl[0] })
    }

    uploadProfileImageFile = async (fileData, name, type) => {
        const { SaveFileDetails, SaveFileData } = this.props.FileAction
        const { authorization } = this.props.LoginState
        let newFileData = [{
            "fileName": name,
            "description": "ClientDetail",
            "contentType": 'png',
            "content": `${fileData}`
        }]
        await this.handleProfileImageValue();
        await SaveFileDetails(newFileData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await SaveFileData();
            await this.handleProfileImageValue();
        }, API_EXE_TIME)
        this.setState({ profileImageUrl: (this.props.FileState.fileUrl && this.props.FileState.fileUrl.length > 0) && this.props.FileState.fileUrl[0] })
    }

    // this method used for the show circular progress bar 
    loadingCircle = (message) => <center> <h3>{message}</h3> <CircularProgress size={80} /> </center>

    RegisterUser = async (sendUserValues) => {
        const { profileImageUrl } = this.state
        const { RegisterUserDetails, loadMessage } = this.props.LoginActions
        const { authorization } = this.props.LoginState
        const newUserData = {
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

