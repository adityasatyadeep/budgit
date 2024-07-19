import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

function valuetext(value) {
  return `${value}°C`;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

const RangeSlider = ({ onChange }) => {
  const [value, setValue] = React.useState([0, 20]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue", newValue)
    onChange("min_price", Math.min(...value));
    onChange("max_price", Math.max(...value));
  };

  const handleInput0Change = (event) => {
    setValue([event.target.value, value[1]])
    onChange("min_price", Math.min(...value));
    console.log("handleInput0")


    onChange("max_price", Math.max(...value));  
  };

  const handleInput1Change = (event) => {
    setValue([value[0], event.target.value])
    onChange("min_price", Math.min(...value));

    onChange("max_price", Math.max(...value));

  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0} max={100}
      />


    <Input
        value={value[0]}
        size="small"
        onChange={handleInput0Change}
        // onBlur={handleBlur}
        inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
        }}
    />
    <Input
        value={value[1]}
        size="small"
        onChange={handleInput1Change}
        // onBlur={handleBlur}
        inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
        }}
    />
    </Box>
  );
}

export default RangeSlider