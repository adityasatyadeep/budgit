import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';



const MonthView = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#292524',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#e7e5e4',
    }));


    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(7)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} key={index}>
                    <Item>{index}</Item>
                </Grid>
            ))}
        </Grid>


    )
}

export default MonthView