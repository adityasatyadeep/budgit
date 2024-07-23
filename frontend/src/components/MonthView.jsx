import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../components/SubmitButton';
import { Card, CardContent, Typography } from "@mui/material";
import axios from 'axios';
import DateCard from "./DateCard";


const MonthView = ({itemsByDay,fetchData}) => {
    const [selected, setSelected] = useState([])

    const MIN_PRICE = 0
    const MAX_PRICE = 100

    const CATEGORIES = ['Food', 'Drinks', 'Gas', 'Recreation', 'Groceries', 'Gifts', 'Technology', 'Rent', 'Miscellaneous']

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const [allData, setAllData] = useState([])
    // const fetchData = async () => {
    //     try {

    //         const response = await axios.get(`http://127.0.0.1:5000/getItems`, {
    //             params: { user_id: 1, categories: CATEGORIES.join(), min_price: MIN_PRICE, max_price: MAX_PRICE },
    //         }
    //         );

    //         // Ensure each row has a unique 'id' property
    //         const dataWithIds = response.data.map((item, index) => ({
    //             ...item,
    //             formattedDate: new Date(item.date).toLocaleString('en-US', dateOptions),
    //             id: item.id || index,
    //         }));

    //         setAllData(dataWithIds);
    //         //   setLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    const dataToUse = allData.slice(0, 43)


    const handleCardSelect = (id) => {
        setSelected(prevSelected => [...prevSelected, id]);
        console.log(selected)
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#292524',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#e7e5e4',
    }));


    // useEffect(() => {
    //     console.log("ITEMS", itemsByDay);

    //     fetchData("2024-07-01","2024-07-31");
    // }, []);

    console.log("ITEMS2", itemsByDay);

    return (
        <Grid container spacing={2} columns={7}>
            {/* {Array.from(Array(42)).map((_, index) => ( */}
            {itemsByDay.map((item, index) => (
                <Grid xs={1} key={index}>
                    <DateCard item={item} index={index} onCardSelect={handleCardSelect}/>
                </Grid>
            ))}
        </Grid>

    )
}

export default MonthView