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
        setSelected(selected => [...selected, id]);
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
