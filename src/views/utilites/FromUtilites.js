import React from 'react';
import { TextField, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio, FormHelperText, InputLabel, Select, FormLabel, Button } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

// this is render text filed
const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

// this is render text filed
const renderTextHiddenField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    label={label}
    type="hidden"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

// this is render text area filed
const renderTextAreaField = ({ maxRows,label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    label={label}
    placeholder={label}
    multiline
    rows={maxRows}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

// this is render text filed
const renderNumberField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    type="number"
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

// this will render the file input
const renderFileInput = ({ input, lable, successFunction, type, meta, ...custom }) => {
  return <label htmlFor={input.name}>
          <input style={{ display: 'none' }} id={input.name} name={input.name} type={type} onChange={event =>handleChange(event, input, successFunction)} />
          <Button color="secondary" variant="contained" component="span" style={{marginTop:10, marginBottom:20}} > Upload {lable}</Button>
        </label>
};

const handleChange = async(event, input, successFunction) => {
  event.preventDefault();
  let imageFile = event.target.files[0];
  if (imageFile) {
    var reader = new FileReader();
    reader.onload =async()=>{
      let byteArray=reader.result.split(",")
      successFunction && successFunction(byteArray.length >0 && byteArray[1],imageFile.name,imageFile.type)
    };
    reader.onerror = function (error) { console.log('Error: ', error); };
    await reader.readAsDataURL(imageFile);
  }
};


// this is render the checkbox 
const renderCheckbox = ({ input, label }) => (
  <FormControlLabel control={ <Checkbox checked={input.value ? true : false} onChange={input.onChange} /> } label={label} />
)

// this is render the radio button
const radioButton = ({ input,label,mainLableName, ...rest }) => (
  <FormControl>
    <FormLabel component="legend">{mainLableName}</FormLabel>
    <RadioGroup {...input} {...rest}>
      {(label && label.length > 0) && label.map((item ,key)=> <FormControlLabel key={key} value={item} control={<Radio />} label={item} />)}
    </RadioGroup>
  </FormControl>
)
  
// this is the render the form helper
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

// this is the render selected filed
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select native {...input} {...custom} inputProps={{ name: label, }} > {children} </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

// this render date time picker filed
const renderDateTimePicker = ({ label, input, meta: { touched, invalid, error }, ...custom }) => 
<TextField
      id="datetime-local"
      label={label}
      type="date"
      defaultValue=""
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
      InputLabelProps={{
        shrink: true
      }}
/>

// this render autocompelete 
const renderAutocomplete=({label,optionData,className, input, meta: { touched, invalid, error }, ...custom})=>
  <Autocomplete
    id="auto-highlight"
    autoHighlight
    options={(optionData && optionData.length >0) ? optionData: []}
    getOptionLabel={optionData => optionData.title}
    onChange={(event, value) => value && input.onChange(value.id)}
    renderInput={(params) => ( <TextField {...params} label={label} margin="normal"  /> )}
    {...custom}
  />

export{
    renderTextField,
    renderTextHiddenField,
    renderCheckbox,
    renderSelectField,
    radioButton,
    renderDateTimePicker,
    renderNumberField,
    renderTextAreaField,
    renderFileInput,
    renderAutocomplete
}