import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTimeInput = ({ name, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        name={name}
        label="Controlled picker"
        value={value}
        onChange={(newValue) => {
          onChange({ target: { name: name, value: newValue } });
        }}
      />
    </LocalizationProvider>
  );
};

const NumberInput = ({ name, value, onChange }) => {
  return (
    <TextField
      id="outlined-price"
      label="Price"
      type="number"
      required
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

const TextInput = ({ name, value, onChange }) => {
  return (
    <TextField
      id="outlined-description"
      label="Description"
      type="text"
      name={name}
      required
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

const SelectInput = ({ name, value, options, onChange }) => {
  return (
    <TextField
      id="outlined-select-category"
      select
      label="Category"
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      required
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.emoji} {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

const LabelComponent = ({ label, name, children }) => {
  return (
    <div className="mb-4 flex items-center">
      <label className="text-pink-700 text-sm font-bold w-5/12 pr-4 text-right" htmlFor={name}>
        {label}:
      </label>
      {children}
    </div>
  );
};

export {LabelComponent, DateTimeInput, NumberInput, TextInput, SelectInput };
