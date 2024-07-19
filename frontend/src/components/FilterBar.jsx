import React from 'react';
import TextField from '@mui/material/TextField';
import MultipleSelect from './MultipleSelect';

const FilterBar = () => {
  return (
    <div>
        Filter By
        <MultipleSelect />

        <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="price"
            variant="filled"
            size="small"
        />

    </div>
  )
}

export default FilterBar;

