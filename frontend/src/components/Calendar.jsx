import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const Calendar = () => {
  const [view, setView] = React.useState('week');

  const handleAlignment = (event, newAlignment) => {
    setView(newAlignment);
  };

  const Views = () => {
    if (view === "week") {
      return (
        <WeekView />
      );
    } else {
      return (
        <MonthView />
      );
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#292524',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#e7e5e4',
  }));

  return (
    <>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="week" aria-label="left aligned">
          <Item>Week</Item>
        </ToggleButton>
        <ToggleButton value="month" aria-label="centered">
          <Item>Month</Item>
        </ToggleButton>
      </ToggleButtonGroup>
      <Views />
    </>
  )
}

export default Calendar