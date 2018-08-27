import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const FormInput = ({
  error,
  value,
  onChange,
  type,
  description,
  errorDescription,
}) => (
  <FormControl margin="normal" fullWidth>
    <InputLabel error={error}>
      {error ? errorDescription : description}
    </InputLabel>
    <Input type={type} error={error} value={value} onChange={onChange} />
  </FormControl>
);
export default FormInput;
