import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react';

const FormRow = ({ label, type, name, value, options, onChange }) => {
  const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '' : number.toFixed(2);
  };

  if (type === "datetime-local"){  
    return (
      <div className="mb-4 flex items-center">
        <label className="text-pink-700 text-sm font-bold w-1/3 pr-4 text-right" htmlFor={name}>
          {label}:
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else if (type === "number"){  
    return (
      <div className="mb-4 flex items-center">
        <label className="text-pink-700 text-sm font-bold w-5/12 pr-4 text-right" htmlFor={name}>
          {label}:
        </label>
        <TextField
          id="outlined-price"
          label="Price"
          type="number"
          required
          name={name}
          value={value}
          onChange={onChange}
          // onBlur={(e) => onChange({ target: { name, value: formatNumber(e.target.value) } })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  } else if (type === "text"){  
    return (
      <div className="mb-4 flex items-center">
        <label className="text-pink-700 text-sm font-bold w-5/12 pr-4 text-right" htmlFor={name}>
          {label}:
        </label>
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
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="mb-4 flex items-center">
        <label className="text-pink-700 text-sm font-bold w-5/12 pr-4 text-right" htmlFor={name}>
          {label}:
        </label>
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
      </div>
    );
  }  
  return null;
};

export default FormRow;
