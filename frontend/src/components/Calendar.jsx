import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import theme from '../pages/theme';


const Calendar = () => {
  const [view, setView] = React.useState('month');
  const [itemsByDay, setItemsByDay] = React.useState([]);

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
  const dummyCat  = ["Food","Drinks","Gas"]

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
    const startDateStr = view === 'week' ? "2024-07-01" : "2024-07-01";
    const endDateStr = view === 'week' ? "2024-07-07" : "2024-07-31";
    const itemsByDay = fetchData(startDateStr, endDateStr);
  }, [view]);

  const Views = () => {
    if (view === "week") {
      return (
        <MonthView itemsByDay={itemsByDay} fetchData={fetchData}/>
      );
    } else {
      return (
        <MonthView itemsByDay={itemsByDay} fetchData={fetchData}/>
      );
    }
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
          <div>Week</div>
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
          <div>Month</div>
        </ToggleButton>
      </ToggleButtonGroup>
      <Views />
    </>
  )
}

export default Calendar