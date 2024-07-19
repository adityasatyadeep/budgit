import React from 'react';
import TextField from '@mui/material/TextField';
import MultipleSelect from './MultipleSelect';
import SubmitButton from './SubmitButton';

const FilterBar = ( { onChange, onSubmit }) => {

  return (
    <div>
        Filter By
        <MultipleSelect onChange={ onChange } />

        <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="price"
            variant="filled"
            size="small"
        />

        <SubmitButton onSubmit={onSubmit}/>

    </div>
  )
}

export default FilterBar;

