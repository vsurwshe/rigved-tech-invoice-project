import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { reset, reduxForm } from 'redux-form';

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
    </form>
</div>
}

// section one
const SectionOne=(props)=>{
    return <h2>Sections 1</h2>
}

// section two
const SectionTwo=(props)=>{
    return <h2>Section 2</h2>
}

const afterSubmit = (result, dispatch) => dispatch(reset('ClientForm'));
export default reduxForm({ form: 'ClientForm', onSubmitSuccess: afterSubmit })(ClientForm);
