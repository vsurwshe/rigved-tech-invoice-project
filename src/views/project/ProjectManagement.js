import React, {Component} from 'react';
import ProjectTable from "./ProjectTable";
import * as ProjectAction from "../../redux/actions/ProjectAction"
import * as MasterDataAction from "../../redux/actions/MasterDataAction"
import * as ClientAction from "../../redux/actions/ClientAction"
import * as PurchaseOrderAction from "../../redux/actions/PurchaseOrderAction"
import { loadMessage } from "../../redux/actions/ClientAction"
import { bindActionCreators } from 'redux';
import { API_EXE_TIME } from '../../assets/config/Config';
import { connect } from 'react-redux';

class ProjectManagement extends Component {
    state = { 
        createProject: false,
        loadProjectList: false,
        projectData: [],
        deleteModel: false,
        operation:"",
        projectContractFileUplaod:false,
        projectContractFileUrl:""
     }
    
    componentDidMount=async()=>{
        console.log(this.props)
        const { projectList }= this.props.ProjectState
        const { authorization }= this.props.LoginState
        const { GetProjectList }= this.props.ProjectAction
        const { Domains, ManagerList } = this.props.MasterDataSet;
        const { GetDomains, GetManagerList } = this.props.MasterDataAction;
        (projectList && projectList.length === 0) && await GetProjectList(0,20,authorization);
        (Domains && Domains.length === 0) && await GetDomains(0, 10, authorization);
        (ManagerList && ManagerList.length === 0) && await GetManagerList(0,10,authorization);
    }

    // this method used for the create project from
    handleCreateProject = (projectData,operation) => { this.setState({ createProject: !this.state.createProject, projectData, operation }) }

    // this method used for the progress bar 
    handleLoadProjectList = () => { this.setState({ loadProjectList: !this.state.loadProjectList }) }

    // this method used for the load the delete model
    handleDeleteModel = (projectData) => { this.setState({ deleteModel: !this.state.deleteModel, projectData }) };

    // this method used for the handling the puchase order file
    handleProjectContractFileUplaod=()=>{ this.setState({projectContractFileUplaod : !this.state.projectContractFileUplaod})}


    render() { 
        return <ProjectTable />;
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
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ProjectAction: bindActionCreators(ProjectAction, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch),
    ClientAction: bindActionCreators(ClientAction, dispatch),
    PurchaseOrderAction: bindActionCreators(PurchaseOrderAction, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectManagement);