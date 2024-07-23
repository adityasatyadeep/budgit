import React from 'react';
import TextField from '@mui/material/TextField';
import MultipleSelect from './MultipleSelect';
import SubmitButton from './SubmitButton';
import RangeSlider from './RangeSlider';

const FilterBar = ( { onChange, onSubmit, handlePriceRange}) => {

  return (
    <div>
        Filter By
        <MultipleSelect onChange={ onChange } />
        
        {/* <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="price"
            variant="filled"
            size="small"
        /> */}

        <RangeSlider onChange = {handlePriceRange} maximum = {500} />
        <SubmitButton onSubmit = {onSubmit} />


    </div>
  )
}

export default FilterBar;

