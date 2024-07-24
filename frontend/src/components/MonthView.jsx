import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import DateCard from './DateCard';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { Typography } from "@mui/material";
import theme from "../pages/theme.js"


const MonthView = ({ itemsByDay }) => {
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

    return (
        <>
            <Grid container spacing={1} columns={7}>
                {Object.entries(itemsByDay).map(([date, items], index) => (
                    <DateCard items={items} onCardSelect={handleCardSelect} key={index} date={date} allOn={allSelected} />
                ))}
                <Grid item xs={2}>
                    <div className=" flex flex-col justify-evenly h-full px-0.5">
                        <Typography variant="h1" color={allSelected ? '#f0abfc' : '#737373'}>
                            Total: ${getTotal().toFixed(2)}
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: 30 }} color={allSelected ? '#000' : '#f0abfc'}>
                            Selected: ${selectedTotal.toFixed(2)}
                        </Typography>
                    </div>
                </Grid>

            </Grid>
        </>
    );
};

export default MonthView;
