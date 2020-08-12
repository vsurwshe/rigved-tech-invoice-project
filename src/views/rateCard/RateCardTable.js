import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TableHead, TextField, Button, FormControl, Select, InputLabel } from '@material-ui/core';
import useStyles from "../client/Styles";
import MaterialTable from 'material-table';
import { API_EXE_TIME } from '../../assets/config/Config';
import CreateIcon from '@material-ui/icons/Create';
import { Alert, Autocomplete } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const RateCardTable = (propsData) => {
  const { rateCardDtos,setRateCardDtos, Domains, SkillCategory, SkillSet }=propsData
    const columns =[
        {   title: "Domain", 
            field: "domainName",
            editComponent :props =>{
                return LoadAutoComplete({ id:"domainName", lable:"Domain", props, optionData:Domains })
            }
        },
        {   title: "Category", 
            field: "skillCategory",
            editComponent :props =>{
                return LoadAutoComplete({ id:"skillCategory", lable:"Category", props, optionData:SkillCategory })
            }
        },
        {   title: "Skill", 
            field: "skillSet",
            editComponent :props =>{
                return LoadAutoComplete({ id:"skillSet", lable:"Skill", props, optionData:SkillSet }) 
            }
        },
        {   title: "Form\u00a0Year", 
            field: "fromYearOfExp",
            editComponent :props =>{ return LoadSelect({props}) }
        },
        {   title: "To\u00a0Year", 
            field: "toYearOfExp",
            editComponent :props =>{ return LoadSelect({props})}
        },
        {   title: "Rate", 
            field: "rate",
            editComponent :props =>{
                return  <TextField
                id="rate"
                label="rate"
                onChange={(event) => props.onChange(event.target.value)}
                error={props.touched && props.invalid}
                helperText={(props.touched && props.error) && props.error}
              />
            }
        }
    ]
    return  <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      title=""
      columns={columns}
      data={(rateCardDtos && rateCardDtos.length > 0) ? rateCardDtos : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        search: false
      }}
      icons={{
        Add: () => <Button variant="contained" color="primary">Add Rate Card</Button>,
        Edit:() => { return <CreateIcon variant="contained" color="primary" /> },
        Delete: () => {return <DeleteOutlineIcon variant="contained" color="secondary" />}
      }}
      editable={{
        isEditable: rowData => false, 
        isEditHidden: rowData => true,
        isDeletable: rowData => false,
        isDeleteHidden: rowData => true,
        onRowAdd: newData =>{
            return new Promise(async(resolve, reject) => {
                await setRateCardDtos([...rateCardDtos,newData]);
                setTimeout(async()=>{
                    resolve();
                },API_EXE_TIME)
            })
        },
        onRowUpdate: (newData, oldData) =>{ return new Promise(async(resolve, reject) => { reject() })},
        onRowDelete: oldData =>{ return new Promise(async(resolve, reject) => { resolve() }) }
      }}
    />
</div>
}

const LoadAutoComplete=(propsData)=>{
  const { id, optionData, props, lable }= propsData
  return <Autocomplete
  id={id}
  autoHighlight
  options={(optionData && optionData.length >0) ? optionData: []}
  getOptionLabel={optionData => (optionData && optionData.name) && optionData.name}
  getOptionSelected={(option, value) => option.id === value.id}
  onChange={(event, value) => value && props.onChange(value.name)}
  renderInput={(params) => ( <TextField {...params} error={(props.touched && props.invalid) || props.error} helperText={props.error && props.error} label={lable} margin="normal"  /> )}
/>
}

const LoadSelect=(propsData)=>{
  const { props }=propsData
  return <FormControl error={props.touched && props.error}>
  <InputLabel htmlFor="age-native-simple">Form Year</InputLabel>
  <Select  native onChange={(event) => props.onChange(event.target.value)} >
      {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
  </Select>
</FormControl>
}


export default RateCardTable;