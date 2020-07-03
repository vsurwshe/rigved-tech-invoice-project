import React from 'react';
import { connect } from 'react-redux';

const ClientRegister=(props)=>{
    return <h1> Client Register</h1>
} 

const mapStateToProps = state => { return state; };
export default connect(mapStateToProps)(ClientRegister);