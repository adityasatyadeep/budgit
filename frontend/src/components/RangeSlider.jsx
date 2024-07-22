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

const RangeSlider = ({ onChange, maximum}) => {
  const [value, setValue] = React.useState([0, maximum]);
  const [left, setLeft] = React.useState(value[0]);
  const [right, setRight] = React.useState(value[1]);

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
    onChange(newValue);
  };

  const handleLeftChange = (event) => {
    let newValue = [Number(event.target.value), value[1]];
    newValue.sort((a, b) => a - b);
    setLeft(newValue[0]);
    setRight(newValue[1]);
    setValue(newValue);
    onChange(newValue);
  };

  const handleRightChange = (event) => {
    let newValue = [value[0], Number(event.target.value)];
    newValue.sort((a, b) => a - b);
    setLeft(newValue[0]);
    setRight(newValue[1]);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 300}}>
      <Stack direction="row" spacing={2}>
        <Input
          value={left}
          size="small"
          onChange={handleLeft}
          onBlur={handleLeftChange}
          inputProps={{
              step: 5,
              min: 0,
              max: maximum,
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
            color: '#f472b6',
            '& .MuiSlider-thumb': {
                width: 14,
                height: 14,
                '&::before': {
                  boxShadow: 'none',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  width: 19,
                  height: 19,
                  boxShadow: '0 0px 0px 7px rgba(244, 114, 182, 0.30)'
                }
            }
          }}
        />
        <Input
            value={right}
            size="small"
            onChange={handleRight}
            onBlur={handleRightChange}
            inputProps={{
                step: 5,
                min: 0,
                max: maximum,
                type: 'number',
                'aria-labelledby': 'input-slider',
            }}
        />
      </Stack>
      
    </Box>
  );
}

export default RangeSlider