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
        <div className={classes.buttonStyle}>
            <center>
                <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}> Submit </Button> &nbsp;&nbsp;
                <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>
            </center>
        </div>
        <Grid container spacing={5}>
            <Grid item >
                {SectionThree({ classes })}
            </Grid>
        </Grid>
    </form>
</div>
}

// section one
const SectionOne=(props)=>{
    const {classes}=props
    return <>
    <Field name="tanNo"  className={classes.textField} component={renderTextField} label="TAN No." helperText="Ex. PDES03028F"/>
    <Field name="tanNo"  className={classes.textField} component={renderTextField} label="GST No." helperText="Ex. 24AAACC1206D1ZM"/>
    </>
}



// section two
const SectionTwo=(props)=>{
    return ContactInfo(props);
}


const ContactInfo=(props)=>{
    return <>
    <Field name="phone" component={renderTextField} label="Phone" fullWidth helperText="Ex. 8709653423" margin="normal" InputLabelProps={{ shrink: true }} />
    <Field name="mobile" component={renderTextField} label="Mobile" fullWidth helperText="Ex. 7834652312" margin="normal" InputLabelProps={{ shrink: true }} />
    <Field name="email" component={renderTextField} label="Email" fullWidth helperText="Ex. admin@rigvedtech.com" margin="normal" InputLabelProps={{ shrink: true }} />
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
    return <h3> Financials </h3>
}

// rate card
const RateCard=(props)=>{
    return <h3> RateCard</h3>
}


const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm', onSubmitSuccess: afterSubmit })(ClientForm);
