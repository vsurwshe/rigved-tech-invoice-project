import React from 'react';
import { formValueSelector, reset, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import useStyles from "../client/Styles";
import { renderTextField, renderDateTimePicker, renderFileInput } from '../utilites/FromUtilites';
import { Required } from '../utilites/FormValidation';


let PurchaseOrderForm = (props) => {
    var classes = useStyles();
    const { SaveClientMethod, pristine, reset, submitting, handleSubmit, cancle, initialValues, operation } = props
    return <div className={classes.girdContainer}>
        <form onSubmit={handleSubmit(SaveClientMethod)}>
            {LoadGird(props)}
            <div className={classes.buttonStyle}>
                <center>
                    {(operation === "edit" || operation === "create") && <>
                        <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> {(initialValues === undefined) ? "SUBMIT" : "EDIT"}</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button></>}&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); cancle() }}> Cancel</Button>
                </center>
            </div>
        </form>
    </div>
}

const LoadGird = (props) => {
    var classes = useStyles();
    const { initialValues } =props
    return <><Grid container spacing={5}>
        <Grid item style={{ paddingLeft: 30 }}>
            {/* {HeaderPart({ classes, initialValues,props })} */}
        </Grid>
    </Grid>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} style={{ paddingLeft: 30 }}>
                {SectionOne({ classes, props })}
            </Grid>
            <Grid item xs={12} sm={6}>
                {SectionTwo({ classes, props })}
            </Grid>
        </Grid>
        <Grid container spacing={5} style={{ paddingLeft: 10 }}>
            <Grid item xs={12}>
                {(initialValues !== undefined) && SectionThree({ classes })} 
            </Grid>
        </Grid>
    </>
}


const SectionOne = (props) => {
    const { classes } = props
    return <>
        <Field name="clientName" component={renderTextField} fullWidth label="Client Name" helperText="Ex. Rigved Tech. Pvt. Ltd." validate={[Required]} />
        <Field name="poNum" component={renderTextField} className={classes.textField} label="Purchase Order Number" helperText="Ex. po121-20/21" validate={[Required]} />
        <Field name="validFrom" component={renderDateTimePicker} className={classes.textField} label="Valid From" helperText="Ex. 01/01/2000" validate={[Required]} />
        <Field name="poUrl" component={renderFileInput} fullWidth helperText="" validate={[Required]} type="file" lable="Choose Purchase Order Image" />
    </>
}

const SectionTwo = (props) => {
    const { classes } = props
    return <>
        <Field name="poAmount" component={renderTextField} className={classes.textField} label="Puchase Order Amount" helperText="Ex. 10000" validate={[Required]} />
        <Field name="invoicedAmount" component={renderTextField} className={classes.textField} label="Invoiced Amount" helperText="Ex. 10000" validate={[Required]} />
        <Field name="balance" component={renderTextField} className={classes.textField} label="Balance" helperText="Ex.67345" validate={[Required]} />
        <Field name="validTo" component={renderDateTimePicker} className={classes.textField} label="Valid to" helperText="Ex. 01/01/2000" validate={[Required]} />
    </>
}

const SectionThree = (props) => {
    const { classes } = props
    return <>
        <h1>PDF Viewer</h1>
    </>

}

// make the selector 
// const selector = formValueSelector('PurchaseOrderForm')
PurchaseOrderForm = connect(state => {
    return { ...state }
})(PurchaseOrderForm)

const afterSubmit = (result, dispatch) => dispatch(reset('PurchaseOrderForm'));
export default reduxForm({
    form: 'PurchaseOrderForm',
    // onSubmitSuccess: afterSubmit 
})(PurchaseOrderForm);

