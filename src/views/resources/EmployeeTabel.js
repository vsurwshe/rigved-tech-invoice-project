import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import { Button, RadioGroup } from '@material-ui/core';
import { API_EXE_TIME } from '../../assets/config/Config';
import ResourceRateCardTable from "./ResourceRateCardTable";


// this component will help to load employee table
const EmployeeTable = (propsData) => {
    const { options, tableData, headerText } = propsData;
    const columns = [
      {
        title: 'Member',
        field: 'account',
        editComponent: props => { return renderAutoComplete({ options, props, label:"Member Name"}) }
      },
      {
        title: 'Onbordaing Date',
        field: 'onbordaingDate',
        editComponent: props => { return renderTextField({ name: "onbordaingDate", label: "Onbordaing Date", type: "date", action: { props } }) }
      }
    ]
    return <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title={headerText}
        columns={columns}
        data={(tableData && tableData.length > 0) ? tableData : []}
        options={{
          headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
          search: false,
          actionsColumnIndex: -1
        }}
        icons={{ Add: () => <Button variant="contained" color="primary">Add Member</Button> }}
        editable={{
          isEditable: rowData => false,
          isEditHidden: rowData => true,
          isDeletable: rowData => false,
          isDeleteHidden: rowData => true,
          onRowAdd: newData => saveEmployeeTabelRecord({newData, "mainProps":propsData}),
          onRowUpdate: (newData, oldData) => { },
          onRowDelete: oldData => { }
        }}
      />
    </div>
}

// this method will help to save empolyee record in employee tabel
const saveEmployeeTabelRecord=(props)=>{
    const { newData }=props
    const { options, tableData, setTableData, selectedRateCard }=props.mainProps
    return new Promise(async (resolve, reject) => {
        let nameUser = options.filter((item) => item.id === newData.account)
        if(selectedRateCard && newData){
          const newUserTableData = {
            ...newData,
            "accountId": newData.account,
            "account": (nameUser && nameUser.length > 0) && nameUser[0].title,
            "rateCardId": selectedRateCard.rateCardId,
            "exitDate": null
          }
          setTableData([...tableData, newUserTableData])
          setTimeout(async()=>{resolve()}, API_EXE_TIME)
        }else{
          alert("Please check the provided fileds");
          reject();
        }
    })
}

// this method will used for the rate card list into material table
const LoadRateCardList = (propsData) => {
    const { rateCardDtos } = (propsData && propsData.mainProps.ClientState && propsData.mainProps.ClientState.clientDataById) && propsData.mainProps.ClientState.clientDataById
    const { selectedRateCard, setSelectedRateCard } = propsData
    return <>
      {rateCardDtos ? 
      <RadioGroup aria-label="rateCard" name="rateCard" value={selectedRateCard && selectedRateCard.rateCardId }>
        <ResourceRateCardTable headerText="Select Rate Card" tableData={rateCardDtos} selectedRateCard={selectedRateCard} setSelectedRateCard={setSelectedRateCard} />
      </RadioGroup>
        : <h4>There is no rate card assign for this client</h4>}
    </>
}

// this method will help to render auto complete
const renderAutoComplete=(propsData)=>{
    const { options, props, label}= propsData
    return <Autocomplete
    id="accountId"
    autoHighlight
    options={(options && options.length > 0) ? options : []}
    getOptionSelected={(options, value) => options.id === value.id}
    getOptionLabel={options => (options && options.title) && options.title}
    onChange={(event, value) => value && props.onChange(value.id)}
    renderInput={(params) => (<TextField {...params} label={label} margin="normal" />)}
  />
}

// this is render the text fileds in tables
const renderTextField = (props) => {
    const { name, label, type, action } = props
    return <TextField
      id={name}
      label={label}
      type={type}
      value={action.props.value}
      onChange={e => action.props.onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      required={true}
    />
}

export {
    EmployeeTable,
    LoadRateCardList
}