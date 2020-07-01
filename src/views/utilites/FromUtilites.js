import React from 'react';
import { Input, TextField, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio, FormHelperText, InputLabel, Select, FormLabel } from "@material-ui/core"

// this is render text filed
const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
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
const renderNumberField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
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

// this is render text filed
const renderFile = (
  field
//   {
//   label,
//   style,
//   field,
//   meta: { touched, invalid, error },
//   ...custom
// }
) => (

  <div className="input-row">
  <input
  type="file"
  onChange={
    ( e ) => {      
      e.preventDefault();
      const { fields } = this.props;
      // convert files to an array
      const files = [ ...e.target.files ];
      fields.yourField.handleChange(files);
    }
  }
  value={null}
/>
  {field.meta.touched && field.meta.error && 
   <span className="error">{field.meta.error}</span>}
</div>

  // <input
  // accept="image/*"
  // id="contained-button-file"
  // multiple
  // type="file"
  //   {...input}
  //   {...custom}
  //   InputLabelProps={{ shrink: true }} 
  // />
)

// this is render the checkbox 
const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

// this is render the radio button
const radioButton = ({ input,label,mainLableName, ...rest }) => (
  <FormControl>
    {console.log("123",mainLableName)}
    <FormLabel component="legend">{mainLableName}</FormLabel>
    <RadioGroup {...input} {...rest}>
      {(label && label.length > 0) && label.map((item ,key)=> <FormControlLabel value={item} control={<Radio />} label={item} />)}
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
const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: label,
        id: 'age-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

// this render date time picker filed
const renderDateTimePicker = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => <TextField
      label={label}
      type="date"
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />


  export{
      renderTextField,
      renderCheckbox,
      renderSelectField,
      radioButton,
      renderDateTimePicker,
      renderFile,
      renderNumberField
  }