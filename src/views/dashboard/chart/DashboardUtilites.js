import React from 'react';
// components
import { Typography } from "../Wrappers";
// styles
import useStyles from "../styles";
import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

const PageTitle=(props)=>{
  const { title, clientSerise, filterByClient, projectSerise }=props
  const classes = useStyles();
   return <div className={classes.pageTitleContainer}>
            <Typography className={classes.typo} variant="h3" size="sm"> {title} </Typography>
                <Autocomplete   
                    id="client-serach"
                    autoHighlight
                    options={(clientSerise && clientSerise.length >0) ? clientSerise: []}
                    getOptionLabel={clientSerise => (clientSerise && clientSerise.name) && clientSerise.name}
                    getOptionSelected={(option, value) => option.name === value.name}
                    onChange={(event, value) =>filterByClient(value)}
                    className={classes.autocomplete}
                    renderInput={(params) => ( <TextField {...params} label="Serach By Client" /> )}
                />
                <Autocomplete
                    id="project-serach"
                    autoHighlight
                    options={(projectSerise && projectSerise.length >0) ? projectSerise: []}
                    getOptionLabel={projectSerise => (projectSerise && projectSerise.name) && projectSerise.name}
                    getOptionSelected={(option, value) => option.name === value.name}
                    onChange={(event, value) =>console.log("Value ", value)}
                    className={classes.autocomplete}
                    renderInput={(params) => ( <TextField {...params} label="Serach By project" /> )}
                />
          </div>
  }

  export{
      PageTitle
  }