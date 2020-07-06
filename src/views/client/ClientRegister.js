import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import useStyles from "../register/styles";

const ClientRegister=(props)=>{
    var classes = useStyles();
    return <>
        <h1> Client Register</h1>
        <ClientForm classes={classes}  SaveClient={(values) => { SaveClientDetails(values, props) }} />
    </>
} 

const SaveClientDetails = async(sendUserValues, props) => {
    console.log("Mes ",props)
//     const newUserData={
//         ...sendUserValues,
//         "profilePic": sendUserValues.profilePic.name,
//         "companyName": "RVTech Pvt Ltd"
//     }
//     await props.RegisterUser(newUserData, props.LoginState.authorization)
//     setTimeout(async () => {
//         await props.loadMessage()
//         // await setLoading(loading = !loading);
//     }, API_EXE_TIME)
}







const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ClientRegister);