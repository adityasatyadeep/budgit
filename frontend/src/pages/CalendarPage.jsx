import React from 'react'
import Calendar from '../components/Calendar';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../pages/theme.js"

const CalendarPage = () => {

  return (
    <ThemeProvider theme={theme}>
      <Calendar />

    </ThemeProvider>


  )
}

export default CalendarPage