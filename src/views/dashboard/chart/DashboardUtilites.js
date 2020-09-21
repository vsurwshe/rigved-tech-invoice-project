import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid } from "@material-ui/core";
// components
import { Typography } from "../Wrappers";
// styles
import useStyles from "../styles";
import { Field, reduxForm, reset } from 'redux-form';
import { renderAutocompleteByName, renderDateTimePicker } from '../../utilites/FromUtilites';

const PageTitle=(props)=>{
  const { title, clientSerise, filterByClient, projectSerise, filterByProject }=props
  const classes = useStyles();
   return <div style={{paddingBottom:"2%"}}>
            <Typography className={classes.typo} variant="h3" size="sm"> {title} </Typography>
            <LoadSerachPanel 
                classes={classes}
                clientSerise={clientSerise}
                filterByClient={filterByClient}
                projectSerise={projectSerise}
            />
          </div>
  }

  let LoadSerachPanel=(props)=>{
    const { clientSerise, filterByClient, projectSerise, filterByProject, classes, pristine, submitting, handleSubmit } = props
    return  <Accordion>
        <AccordionSummary aria-label="Expand" aria-controls="additional-actions1-content" >Filter chart data</AccordionSummary>
           <AccordionDetails>
               <Grid container spacing={5} style={{ paddingLeft: 10, paddingTop: 20 }}>
                    <Grid item xs={12}>
                    <from onSubmit={handleSubmit(FilterChartAPI)} >
                         <div>
                            <Field name="clientId"  component={renderAutocompleteByName} style={{ margin: 8 }} optionData={clientSerise} />
                            <Field name="projectId"  component={renderAutocompleteByName} style={{ margin: 8 }} optionData={clientSerise} />
                         </div>
                         
                         <div>
                             <Field name="from" component={renderDateTimePicker} type="date" style={{ margin: 8 }} label="Form Date" helperText="Ex. 01/01/2000"  margin="normal" />
                             <Field name="to" component={renderDateTimePicker} type="date" style={{ margin: 8 }} label="To Date" helperText="Ex. 01/01/2000"  margin="normal" />
                         </div>
                         
                         <div style={{float:"right"}}>
                             <Button type="submit" style={{ margin:12}} variant="outlined" color="secondary" disabled={pristine || submitting} > Apply Filter</Button>
                         </div>
                         </from>
                     </Grid>
               </Grid>
        </AccordionDetails>
    </Accordion>
  }

  const FilterChartAPI=(props)=>{
      console.log("Props ",props)
  }

  const afterSubmit = (result, dispatch) => dispatch(reset('DashBoardSerachPanle'));
  LoadSerachPanel= reduxForm({form: 'DashBoardSerachPanle', onSubmitSuccess: afterSubmit})(LoadSerachPanel);

  export{
      PageTitle
  }