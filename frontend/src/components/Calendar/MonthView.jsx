import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import DateCard from './DateCard';
import SubmitButton from '../SubmitButton';
import axios from 'axios';
import { Card, Typography } from "@mui/material";


const MonthView = ({ itemsByDay, month }) => {
    const [selected, setSelected] = useState([]);
    const [selectedTotal, setSelectedTotal] = useState(0);
    const [allSelected, setAllSelected] = useState(true);

    const [currentDateRange, setCurrentDateRange] = useState({
        startDate: '2024-07-01',
        endDate: '2024-07-31'
    });

    const getTotal = () => {
        return Object.values(itemsByDay)
            .flat()
            .reduce((total, item) => total + Number(item.price), 0);
    }


    const handleCardSelect = (id) => {
        setSelected((prevSelected) => {
            var new_price = selectedTotal;
            var newSelected = [];
            if (prevSelected.includes(id)) {
                // Remove the id from the array
                newSelected = prevSelected.filter((selectedId) => selectedId !== id);
                console.log(`Removed ${id}:`, newSelected);

                // update total price
                for (const item of itemsByDay[id]) {
                    new_price -= Number(item.price)
                }
                setSelectedTotal(Number(new_price.toFixed(2)))

            } else {
                // Add the id to the array
                newSelected = [...prevSelected, id];
                console.log(`Added ${id}:`, newSelected);

                // update total price
                for (const item of itemsByDay[id]) {
                    new_price += Number(item.price)
                }
                setSelectedTotal(Number(new_price.toFixed(2)))

            };
            if (newSelected.length == 0) {
                setAllSelected(true);
            } else {
                setAllSelected(false);
            }
            console.log("SELECTED:", newSelected);
            console.log("NEW_PRICE:", new_price.toFixed(2));
            return newSelected;
        },
        );
    };


    //Set Weekday headers
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <>
            <Grid container spacing={1} columns={7}>
                {weekDays.map((dayName, index) => (
                    <Grid item xs={1} key={dayName}>
                        <Card
                            sx={{
                                backgroundColor: '#262626', // Charcoal color when not selected
                                // aspectRatio: '1 / 1'
                                boxShadow: '2px 2px 2px rgba(240, 171, 252, 0.2)', // Adds a medium box shadow
                                '&:hover': {
                                    boxShadow: 'none', // Adds a larger shadow on hover
                                },
                            }}>

                            <div className=" flex flex-col justify-center align-middle px-0.5 ">
                                <Typography variant="bold" sx={{ fontSize: 30 }} color='#737373'>
                                    {dayName}
                                </Typography>
                            </div>
                        </Card>

                    </Grid>
                ))}
                {Object.entries(itemsByDay).map(([date, items], index) => {
                    if (date.split("-")[1] !== month) {
                        return (
                            <Grid item xs={1}>
                                <Card
                                    sx={{
                                        backgroundColor: '#171717', // Charcoal color when not selected
                                        outline: '4px solid transparent',
                                        aspectRatio: '1 / 1',
                                        boxShadow: '2px 2px 2px rgba(240, 171, 252, 0.2)', // Adds a medium box shadow
                                        '&:hover': {
                                            boxShadow: 'none', // Adds a larger shadow on hover
                                        },
                                    }}
                                />
                            </Grid>
                        );
                    }
                    return (
                        <DateCard items={items} onCardSelect={handleCardSelect} key={index} date={date} allOn={allSelected} month={month} />
                    );
                })}
                <Grid item xs={2}>
                    <Card
                        sx={{
                            backgroundColor: '#262626', // Charcoal color when not selected
                            height: '100%',
                            boxShadow: '2px 2px 2px rgba(240, 171, 252, 0.2)', // Adds a medium box shadow
                        }}>
                        <div className=" flex flex-col justify-evenly h-full px-0.5">
                            <Typography variant="bold" sx={{ fontSize: 30 }} color={allSelected ? '#f0abfc' : '#737373'}>
                                Total: ${getTotal().toFixed(2)}
                            </Typography>
                            <Typography variant="bold" sx={{ fontSize: 30 }} color={allSelected ? '#737373' : '#f0abfc'}>
                                Selected: ${selectedTotal.toFixed(2)}
                            </Typography>
                        </div>
                    </Card>

                </Grid>

            </Grid>
        </>
    );
};

export default MonthView;
