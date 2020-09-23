import React from 'react';
import { TextField, Button, FormControl, Select, InputLabel } from '@material-ui/core';
import MaterialTable from 'material-table';
import { API_EXE_TIME } from '../../assets/config/Config';
import CreateIcon from '@material-ui/icons/Create';
import { Autocomplete } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const RateCardTable = (propsData) => {
  const { rateCardDtos,setRateCardDtos, Domains, SkillCategory, SkillSet, rateOptions }=propsData
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
      {   title: "Rate\u00a0Options", 
          field: "rateCardType",
          editComponent :props =>{
              return LoadAutoComplete({ id:"rateCardType", lable:"Rate Options", props, optionData:rateOptions })
          }
      },
      {   title: "Rate\u00a0Duration", 
          field: "rateCardDuration",
          editComponent :props =>{
            return  <TextField
                id="Duration"
                label="Rate Duration"
                onChange={(event) => props.onChange(event.target.value)}
                error={props.touched && props.invalid}
                helperText={(props.touched && props.error) && props.error}
            />
          }
      },
      {   title: "Form\u00a0Year", 
          field: "fromYearOfExp",
          editComponent :props =>{ return LoadSelect({props, label:"Form Year"}) }
      },
      {   title: "To\u00a0Year", 
          field: "toYearOfExp",
          editComponent :props =>{ return LoadSelect({props, label:"To Year"})}
      },
      {   title: "Rate", 
          field: "rate",
          editComponent :props =>{
              return  <TextField
              id="rate"
              label="Rate"
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
      // onChangeColumnHidden={}
      data={(rateCardDtos && rateCardDtos.length > 0) ? rateCardDtos : []}
      options={{
        headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        search: false,
        actionsColumnIndex: -1
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
              if(newData){
                console.log("Data ",newData.fromYearOfExp,newData.toYearOfExp,newData.fromYearOfExp < newData.toYearOfExp)
                if(!newData.fromYearOfExp || !newData.toYearOfExp){
                  !newData.fromYearOfExp && alert("Please select form year");
                  !newData.toYearOfExp && alert("Please select to year");
                  reject();
                }else if(newData.fromYearOfExp < newData.toYearOfExp){
                  await setRateCardDtos([...rateCardDtos,newData]);
                  setTimeout(async()=>{
                      resolve();
                  },API_EXE_TIME)
                }else{
                  alert("Form year value should be less than compare to year value");
                  reject();
                }
              }else{
                reject();
              }
            })
        },
        onRowUpdate: (newData, oldData) =>{ return new Promise(async(resolve, reject) => { reject() })},
        onRowDelete: oldData =>{ return new Promise(async(resolve, reject) => { resolve() }) }
      }}

      onChangeColumnHidden={(column,hidden)=>{
        console.log("DP", column,hidden)
      }}
    />
</div>
}

const LoadAutoComplete=(propsData)=>{
  const { id, optionData, props, lable, setOpen }= propsData
  return <Autocomplete
  id={id}
  style={{marginTop:"-10px"}}
  autoHighlight
  options={(optionData && optionData.length >0) ? optionData: []}
  getOptionLabel={optionData => (optionData && optionData.name) && optionData.name}
  getOptionSelected={(option, value) => option.id === value.id}
  onChange={(event, value) =>{
      setOpen && setOpen(true);
      value && props.onChange(value.name)
  }}
  renderInput={(params) => ( <TextField {...params} error={(props.touched && props.invalid) || props.error} helperText={props.error && props.error} label={lable} margin="normal"  /> )}
/>
}

const LoadSelect=(propsData)=>{
  const { props ,label }=propsData
  return <FormControl error={props.touched && props.error} style={{width:"100%"}}>
  <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
  <Select  native onChange={(event) => props.onChange(event.target.value)} >
      {[...Array(10)].map((item, key) => <option key={key} value={key}>{key}</option>)}
  </Select>
</FormControl>
}

export default RateCardTable;