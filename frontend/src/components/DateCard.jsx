import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import axios from 'axios';

const DateCard = ({ item, index, onCardSelect }) => {

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (id) => {
        setIsSelected(!isSelected);
        onCardSelect(id);
    };
    return (
        <>
        <Card 
            sx={{
                backgroundColor: isSelected ? '#e0e0e0' : 'white',
                border: isSelected ? '2px solid #be25a5' : '2px solid transparent',
            }}
        >

        </Card>
        <CardActionArea onClick={() => handleClick(item.id)} >
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.date}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {item.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ${item.price}
                    </Typography>
                    <Typography variant="body2">
                        {item.category}
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>{index}
            </Card>

        </CardActionArea>
        </>

    )
}

export default DateCard