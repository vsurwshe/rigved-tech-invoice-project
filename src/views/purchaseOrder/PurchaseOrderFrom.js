import React from 'react';
import { formValueSelector, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';

let PurchaseOrderForm=()=>{
    return <Card>
        <h1> Purchase Order Form</h1>
    </Card>
}




// make the selector 
const selector = formValueSelector('PurchaseOrderForm')
PurchaseOrderForm = connect(state => {
    return { ...state }
})(PurchaseOrderForm)

const afterSubmit = (result, dispatch) => dispatch(reset('PurchaseOrderForm'));
export default reduxForm({ form: 'PurchaseOrderForm', 
// onSubmitSuccess: afterSubmit 
})(PurchaseOrderForm);

