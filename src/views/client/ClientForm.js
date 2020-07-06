import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { reset, reduxForm, Field } from 'redux-form';
import SimpleTabs from './TabPanleUtilites';
import { renderTextField } from '../utilites/FromUtilites';

const ClientForm=(props)=>{
    const { classes, SaveClient, pristine, reset, submitting, handleSubmit } = props
    return <div className={classes.girdContainer}>
    <form onSubmit={handleSubmit(SaveClient)}>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
                {SectionOne({ classes })}
            </Grid>
            <Grid item xs={12} sm={6}>
                {SectionTwo({ classes })}
            </Grid>
        </Grid>
        <Grid container spacing={5}>
            <Grid item >
                {SectionThree({ classes })}
            </Grid>
        </Grid>
        <div className={classes.buttonStyle}>
            <center>
                <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> Submit </Button> &nbsp;&nbsp;
                <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>
            </center>
        </div>

    </form>
</div>
}

// section one
const SectionOne=(props)=>{
    return <>
    <Field name="tanNo"  component={renderTextField} label="TAN No." fullWidth helperText="Ex. PDES03028F"/>
    <Field name="gstNo"  component={renderTextField} label="GST No." fullWidth helperText="Ex. 24AAACC1206D1ZM"/>
    </>
}



// section two
const SectionTwo=(props)=>{
    return ContactInfo(props);
}

const ContactInfo=(props)=>{
    return <>
    <Field name="phone" component={renderTextField} label="Phone" fullWidth helperText="Ex. 8709653423" />
    <Field name="mobile" component={renderTextField} label="Mobile" fullWidth helperText="Ex. 7834652312" />
    <Field name="email" component={renderTextField} label="Email" fullWidth helperText="Ex. admin@rigvedtech.com"/>
    </>
}

// section three
const SectionThree=(props)=>{
    const tabsData=[
        {label : "Contact & Address", component: ContactAddress},
        {label : "Financials", component:Financials },
        {label : "Rate Card", component:RateCard }
    ]
    return <SimpleTabs tabData={tabsData}/>
}

// contact address
const ContactAddress=(props)=>{
    return ContactInfo(props)
}

// financials
const Financials=(props)=>{
    return  <>
    <Field name="accNumber" component={renderTextField} label="Account Number" fullWidth helperText="Ex. 3456231234567" />
    <Field name="ifscCode" component={renderTextField} label="IFSC Code" fullWidth helperText="Ex. SBI0000345" />
    <Field name="bankName" component={renderTextField} label="Bank Name" fullWidth helperText="Ex. State Bank of India" />
    <Field name="branchName" component={renderTextField} label="Branch Name" fullWidth helperText="Ex. Mumbai" />
    </>
}

// rate card
const RateCard=(props)=>{
    return <h3> RateCard</h3>
}


const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm', onSubmitSuccess: afterSubmit })(ClientForm);
