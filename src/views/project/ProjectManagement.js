import React, {Component} from 'react';
import ProjectTable from "./ProjectTable";
import ProjectForm from "./ProjectFrom";
import {Card, CircularProgress } from '@material-ui/core';
import * as ProjectAction from "../../redux/actions/ProjectAction"
import * as MasterDataAction from "../../redux/actions/MasterDataAction"
import * as ClientAction from "../../redux/actions/ClientAction"
import * as PurchaseOrderAction from "../../redux/actions/PurchaseOrderAction"
import { loadMessage } from "../../redux/actions/ClientAction"
import { bindActionCreators } from 'redux';
import { API_EXE_TIME } from '../../assets/config/Config';
import { connect } from 'react-redux';
import moment from 'moment';

class ProjectManagement extends Component {
    state = { 
        createProject: false,
        loadProjectList: false,
        projectData: [],
        deleteModel: false,
        operation:"",
        projectContractFileUpload:false,
        projectContractFileUrl:""
     }
    
    componentDidMount=async()=>{
        const { listOfClient } = this.props.ClientState;
        const { projectList }= this.props.ProjectState
        const { authorization }= this.props.LoginState
        const { purchaseOrderList }= this.props.PurchaseOrderState
        const { Domains, ManagerList } = this.props.MasterDataSet;
        const { GetDomains, GetManagerList } = this.props.MasterDataAction;
        const { GetProjectList }= this.props.ProjectAction
        const { GetClientList } = this.props.ClientAction;
        const { GetPurchaseOrderList }= this.props.PurchaseOrderAction
        await this.handleLoadProjectList();
        (listOfClient && listOfClient.length === 0) && await GetClientList(0,20,authorization);
        (purchaseOrderList && purchaseOrderList.length === 0) && await GetPurchaseOrderList(0,20,authorization);
        (Domains && Domains.length === 0) && await GetDomains(0, 10, authorization);
        (ManagerList && ManagerList.length === 0) && await GetManagerList(0,10,authorization);
        (projectList && projectList.length === 0) && await GetProjectList(0,20,authorization);
        await this.handleLoadProjectList();
    }

    // this method used for the create project from
    handleCreateProject = (projectData,operation) => { this.setState({ createProject: !this.state.createProject, projectData, operation }) }

    // this method used for the progress bar 
    handleLoadProjectList = () => { this.setState({ loadProjectList: !this.state.loadProjectList }) }

    // this method used for the load the delete model
    handleDeleteModel = (projectData) => { this.setState({ deleteModel: !this.state.deleteModel, projectData }) };

    // this method used for the handling the puchase order file
    handleProjectContractFileUplaod=()=>{ this.setState({projectContractFileUpload : !this.state.projectContractFileUpload})}


    render() { 
        const {createProject, projectData}=this.state
        return <Card> {createProject ? this.loadProjectForm(projectData) :this.loadProjectTable()}</Card>
    }

    uploadContractFile=async(fileData,name,type)=>{
        const {SaveFileDetails, SaveFileData}= this.props.FileAction
        const { authorization } = this.props.LoginState
        let newFileData=[{
            "fileName":name,
	        "description":"PoDetail",
	        "contentType":"pdf",
	        "content":`${fileData}`
        }]
        await this.handleProjectContractFileUplaod();
        await SaveFileDetails(newFileData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await SaveFileData();
            await this.handleProjectContractFileUplaod();
        }, API_EXE_TIME)
        this.setState({projectContractFileUrl : (this.props.FileState.fileUrl && this.props.FileState.fileUrl.length >0)  && this.props.FileState.fileUrl[0]})
    }

    // this method used for the loading Project form
    loadProjectForm = (projectData) => {
        const {operation,projectContractFileUrl, projectContractFileUpload}=this.state
        let newProjectData = undefined;
        if (projectData) {
            newProjectData = {
                ...projectData,
                "validFrom":moment(projectData.validFrom).format('YYYY-MM-DD') ,
                "validTo":moment(projectData.validTo).format('YYYY-MM-DD') ,
            }
        }
        const data={ operation,projectContractFileUrl, projectContractFileUpload }
        return <ProjectForm 
                stateData={data} 
                initialValues={newProjectData} 
                SaveMethod={this.SaveProject} 
                cancle={this.handleCreateProject} 
                uploadFile={this.uploadContractFile}
                clearFile={this.clearFileUrl}
            />
    }
    // this method used for the clear the state variable
    clearFileUrl=()=>{
        this.setState({projectContractFileUrl:""})
    }

    // this method main framework which calling load PurchaseOrder table method
    loadProjectTable = () => {
        const { loadProjectList } = this.state
        return < div style={{ paddingRight: 10 }}>  {loadProjectList ? this.loadingCircle() :this.loadingProjectTable()} </div>
    }

    // this method used for load the client table
    loadingProjectTable = () => {
        const {operation}=this.state
        return <>
        {/* {this.loadDeleteModel()} */}
            <ProjectTable  
                operation={operation} 
                createProject={this.handleCreateProject} 
            />
    </>
    }
    // this method used for the show circular progress bar 
    loadingCircle = () => <center> <h3>Project Management</h3> <CircularProgress size={80} /> </center>

    // this method used for the call the save project api
    SaveProject=async(sendUserValues)=>{
        console.log("Calling Save Project ",sendUserValues)
        // const { purchaseOrderFileUrl }=this.state
        // const { SavePurchaseOrderDetails, loadMessage, GetPurchaseOrderList } = this.props.PurchaseOrderAction;
        // const { authorization } = this.props.LoginState
        // const newUserData = {
        //     ...sendUserValues,
        //     "poCntrUrl":(purchaseOrderFileUrl === "" || purchaseOrderFileUrl === undefined) ? sendUserValues.poCntrUrl  : purchaseOrderFileUrl,
        //     "active": true,
        // }
        // await SavePurchaseOrderDetails(newUserData, authorization)
        // setTimeout(async () => {
        //     await loadMessage()
        //     await GetPurchaseOrderList(0, 20, authorization);
        //     this.handleCreatePurchaseOrder();
        // }, API_EXE_TIME)
    }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ProjectAction: bindActionCreators(ProjectAction, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch),
    ClientAction: bindActionCreators(ClientAction, dispatch),
    PurchaseOrderAction: bindActionCreators(PurchaseOrderAction, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectManagement);