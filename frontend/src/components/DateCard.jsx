import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import axios from 'axios';

const DateCard = ({ items, onCardSelect, date }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (id) => {
        console.log("ID:",id);
        setIsSelected(!isSelected);
        onCardSelect(id);
    };
    return (
        <Grid item xs={1}>
            <Card
                sx={{
                    backgroundColor: isSelected ? '#e0e0e0' : 'white',
                    border: isSelected ? '2px solid #be25a5' : '2px solid transparent',
                }}
            />
            <CardActionArea onClick={() => handleClick(date)} >
                <Card>
                    {items.map((item,index) => (
                        <CardContent key={item.id || index}>
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
                            </Typography>
                        </CardContent>
                    ))}

                </Card>

            </CardActionArea>
        </Grid>

    )
}

export default DateCard