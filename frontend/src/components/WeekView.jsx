import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import { Card, CardContent, Typography } from "@mui/material";
import axios from 'axios';


const WeekView = ({itemsByDay,fetchData}) => {

    const data = Array.from(Array(7)).map((_, index) => ({
      [index]: index,
    }));
    
    const data2 = JSON.stringify(data)

  return (
    <Grid container spacing={2} columns={7}>
        {data.map((_, index) => (
            <Grid xs={1} key={index}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                        {index}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                        </Typography>
                        <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>{index} 
                </Card>
            </Grid>
        ))}
    </Grid>


    )
}

export default WeekView