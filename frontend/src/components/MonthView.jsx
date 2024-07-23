import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import DateCard from './DateCard';

const MonthView = ({ itemsByDay }) => {
    const [selected, setSelected] = useState([]);
    const [currentDateRange, setCurrentDateRange] = useState({
        startDate: '2024-07-01',
        endDate: '2024-07-31'
    });

    // useEffect(() => {
    //     fetchData(currentDateRange.startDate, currentDateRange.endDate);
    // }, [currentDateRange, fetchData]);

    const handleCardSelect = (id) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Remove the id from the array
                const newSelected = prevSelected.filter((selectedId) => selectedId !== id);
                console.log(`Removed ${id}:`, newSelected);
                return newSelected;
            } else {
                // Add the id to the array
                const newSelected = [...prevSelected, id];
                console.log(`Added ${id}:`, newSelected);
                return newSelected;
            }
        });
    };
    

    return (
        <Grid container spacing={2} columns={7}>
            {Object.entries(itemsByDay).map(([date, items],index) => (
                <DateCard items={items} onCardSelect={handleCardSelect} key={index} date={date}/>
            ))}
        </Grid>
    );
};

export default MonthView;
