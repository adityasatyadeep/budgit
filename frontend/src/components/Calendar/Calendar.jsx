import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../SubmitButton';
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const Calendar = () => {
  const [view, setView] = React.useState('month');
  const [itemsByDay, setItemsByDay] = React.useState([]);
  const now = new Date()
  const [currentDate,setCurrentDate] = React.useState(now.toJSON().split('T')[0]);

  const handleAlignment = (event, newAlignment) => {
    setView(newAlignment);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#292524',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#e7e5e4',
  }));
  const dummyCat = ["Food", "Drinks", "Gas"]

  const fetchData = async (startDateStr, endDateStr) => {
    try {
      // Parse the provided start and end date strings
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      endDate.setDate(endDate.getDate() + 1); // Add one day to the end date

      // Generate date_start and date_end from the provided start and adjusted end date strings
      const date_start = startDate.toISOString().split('T')[0];
      const date_end = endDate.toISOString().split('T')[0];

      // Fetch data from the server
      const response = await axios.get(`http://127.0.0.1:5000/getCalendarItems`, {
        params: { user_id: "1", min_price: 0, max_price: 600, date_start: date_start, date_end: date_end },
      });
      // console.log(response.data);

      // Generate all dates within the range
      const allDates = [];
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        allDates.push(new Date(d).toISOString().split('T')[0]);
      }

      // Initialize dictionary with all dates
      const itemsByDay = allDates.reduce((acc, date) => {
        acc[date] = [];
        return acc;
      }, {});

      // Populate the dictionary with transactions
      response.data.forEach(item => {
        // console.log(item.date);
        const dateKey = item.date.split(' ')[0]; // Assuming the date is in ISO format
        if (itemsByDay[dateKey]) {
          itemsByDay[dateKey].push(item);
          itemsByDay[dateKey].sort((a, b) => new Date(a.date) - new Date(b.date));
        }
      });

      setItemsByDay(itemsByDay);
      return itemsByDay; // Return the dictionary
    } catch (error) {
      console.error('Error fetching data:', error);
      // return {}; // Return an empty object in case of error
    }
  };


  useEffect(() => {
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);
    if (view === "month") {
      startDate.setDate(0);
      const bufferBeginning = (startDate.getDay() + 1)%7;
      startDate.setDate(startDate.getDate() - bufferBeginning);

      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(-1);
      const bufferEnding = 6 - ((endDate.getDay()+1)% 7)  ;
      endDate.setDate(endDate.getDate() + bufferEnding);
    } else if (view === "week") {
      const bufferBeginning = startDate.getDay() + 1;
      startDate.setDate(startDate.getDate() - bufferBeginning);

      const bufferEnding = 6 - ((endDate.getDay()+1)% 7)  ;
      endDate.setDate(endDate.getDate() + bufferEnding);
    }
    // const startDateStr = view === 'week' ? "2024-07-01" : "2024-07-01";
    // const endDateStr = view === 'week' ? "2024-07-07" : "2024-07-31";
    const date_start = startDate.toISOString().split('T')[0];
    const date_end = endDate.toISOString().split('T')[0];
    fetchData(date_start, date_end);
  }, [view,currentDate]);

  const Views = () => {
    let cur = new Date(currentDate)
    if (view === "week") {
      return (
        <WeekView itemsByDay={itemsByDay} fetchData={fetchData} />
      );
    } else {
      return (
        <MonthView itemsByDay={itemsByDay} fetchData={fetchData} month={cur.getMonth()+1}/>
      );
    }
  };

  const handleLeftClick = () => {
    let cur = new Date(currentDate);
    if (view === "week") {
      cur.setDate(cur.getDate() - 7);
    } else if (view === "month") {
      cur.setDate(7);
      cur.setMonth(cur.getMonth() - 1);
    }
    console.log("LEFT",cur);
    setCurrentDate(cur.toJSON().split('T')[0])
  };

  const handleRightClick = () => {
    let cur = new Date(currentDate);
    if (view === "week") {
      cur.setDate(cur.getDate() + 7);
    } else if (view === "month") {
      cur.setMonth(cur.getMonth() + 1);
    }
    console.log("RIGHT",cur);
    setCurrentDate(cur.toJSON().split('T')[0])
  };

  const handleToday = () => {
    setCurrentDate(now.toJSON().split('T')[0])
  };


  return (
    <>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="week"
          aria-label="left aligned"
          sx={{
            color: 'white', // Text color
            backgroundColor: 'black', // Background color
            '&.Mui-selected': {
              backgroundColor: 'gray', // Background color when selected
              color: 'white', // Text color when selected
            },
            '&:hover': {
              backgroundColor: 'darkgray', // Background color on hover
            },
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 15 }}>
            Week
          </Typography>

        </ToggleButton>
        <ToggleButton
          value="month"
          aria-label="centered"
          sx={{
            color: 'white', // Text color
            backgroundColor: 'black', // Background color
            '&.Mui-selected': {
              backgroundColor: 'gray', // Background color when selected
              color: 'white', // Text color when selected
            },
            '&:hover': {
              backgroundColor: 'darkgray', // Background color on hover
            },
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 15 }}>
            Month
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <ButtonGroup color="secondary" variant="contained" aria-label="Basic button group">
        <Button onClick={handleLeftClick}><ChevronLeftIcon/></Button>
        <Button onClick={handleToday}>Today</Button>
        <Button onClick={handleRightClick}><ChevronRightIcon/></Button>
      </ButtonGroup>
      <Views />
    </>
  )
}

export default Calendar