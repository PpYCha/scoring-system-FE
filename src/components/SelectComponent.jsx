import React from "react";

import { useField, useFormikContext } from "formik";
import { MenuItem, TextField } from "@mui/material";

const SelectComponent = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {options.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectComponent;
