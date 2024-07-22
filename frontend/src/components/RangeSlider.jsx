import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Stack from '@mui/material/Stack';


function valuetext(value) {
  return `${value}°C`;
}

const Input = styled(MuiInput)`
  width: 60px;
`;

const RangeSlider = ({ onChange }) => {
  const [value, setValue] = React.useState([0, 100]);
  const [left, setLeft] = React.useState(0);
  const [right, setRight] = React.useState(100);

  const handleLeft = (event) => {
    setLeft(event.target.value);
  }

  const handleRight = (event) => {
    setRight(event.target.value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLeft(newValue[0]);
    setRight(newValue[1]);
    console.log("newValue", newValue);
    onChange(newValue);
  };

  const handleInput0Change = (event) => {
    let event2 = {target:{value:[event.target.value, value[1]].sort()}};
    // handleChange(event2);
    let newValue = [event.target.value, value[1]].sort();
    setLeft(newValue[0]);
    setRight(newValue[1]);
    setValue(newValue);
    onChange(newValue);
  };

  const handleInput1Change = (event) => {
    let newValue = [value[0], event.target.value].sort();
    setLeft(newValue[0]);
    setRight(newValue[1]);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 400}}>
      <Stack direction="row" spacing={2}>
        <Input
          value={left}
          size="small"
          onChange={handleLeft}
          onBlur={handleInput0Change}
          inputProps={{
              step: 5,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
          }}
        />
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0} max={100}
          sx={{
            color: '#f472b6' 
          }}
        />
        <Input
            value={right}
            size="small"
            onChange={handleRight}
            onBlur={handleInput1Change}
            inputProps={{
                step: 5,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
            }}
        />
      </Stack>
      
    </Box>
  );
}

export default RangeSlider