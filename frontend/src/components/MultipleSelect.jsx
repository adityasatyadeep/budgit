import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories =[
    { emoji: "🍔", value: "Food" },
    { emoji: "🥤", value: "Drinks" },
    { emoji: "⛽️", value: "Gas" },
    { emoji: "🏀", value: "Recreation" },
    { emoji: "🥕", value: "Groceries" },
    { emoji: "🎁", value: "Gifts" },
    { emoji: "💻", value: "Technology" },
    { emoji: "🏠", value: "Rent" },
    { emoji: "♾️", value: "Miscellaneous" }
  ]

function getStyles(category, personCategory, theme) {
  return {
    fontWeight:
      personCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [personCategory, setPersonCategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-category-label">category</InputLabel>
        <Select
          labelId="demo-multiple-category-label"
          id="demo-multiple-category"
          multiple
          value={personCategory}
          onChange={handleChange}
          input={<OutlinedInput label="category" />}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.value}
              value={category.value}
              style={getStyles(category.value, personCategory, theme)}
            >
              {category.emoji + " " + category.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}