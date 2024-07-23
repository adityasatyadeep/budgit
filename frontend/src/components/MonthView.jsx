import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import DateCard from './DateCard';
import SubmitButton from './SubmitButton';
import axios from 'axios';


const MonthView = ({ itemsByDay }) => {
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);


    const [currentDateRange, setCurrentDateRange] = useState({
        startDate: '2024-07-01',
        endDate: '2024-07-31'
    });
   

    const handleCardSelect = (id) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Remove the id from the array
                const newSelected = prevSelected.filter((selectedId) => selectedId !== id);
                console.log(`Removed ${id}:`, newSelected);

                // update total price
                var new_price = total
                for (const item of itemsByDay[id]) {
                    new_price -= Number(item.price)
                }
                setTotal(new_price)

                return newSelected;
            } else {
                // Add the id to the array
                const newSelected = [...prevSelected, id];
                console.log(`Added ${id}:`, newSelected);

                // update total price
                var new_price = total
                for (const item of itemsByDay[id]) {
                    new_price += Number(item.price)
                }
                setTotal(new_price)

                return newSelected;
            }
        },
            console.log("SELECTED:", selected)

        );
    };

    return (
        <>
            <Grid container spacing={2} columns={7}>
                {Object.entries(itemsByDay).map(([date, items], index) => (
                    <DateCard items={items} onCardSelect={handleCardSelect} key={index} date={date} />
                ))}
            </Grid>
        </>
    );
};

export default MonthView;
