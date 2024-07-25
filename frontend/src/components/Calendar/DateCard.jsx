import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '../SubmitButton';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import axios from 'axios';
import DayModal from './DayModal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const DateCard = ({ items, onCardSelect, date, allOn }) => {
    const [isSelected, setIsSelected] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = (id) => {
        // console.log("ID:", id);
        setIsSelected(!isSelected);
        onCardSelect(id);
    };



    const categories = {
        "Food": { emoji: "🍔", value: "Food", color: "#22c55e" },
        "Drinks": { emoji: "🥤", value: "Drinks", color: "#0ea5e9" },
        "Gas": { emoji: "⛽️", value: "Gas", color: "#fcd34d" },
        "Recreation": { emoji: "🏀", value: "Recreation", color: "#6b21a8" },
        "Groceries": { emoji: "🥕", value: "Groceries", color: "#14b8a6" },
        "Gifts": { emoji: "🎁", value: "Gifts", color: "#dc2626" },
        "Technology": { emoji: "💻", value: "Technology", color: "#334155" },
        "Rent": { emoji: "🏠", value: "Rent", color: "#f472b6" },
        "Miscellaneous": { emoji: "♾️", value: "Miscellaneous", color: "#525252" }
    }
    // return (
    //     <Grid item xs={1}>
    //         <Card
    //             sx={{
    //                 backgroundColor: isSelected ? '#e0e0e0' : 'white',
    //                 border: isSelected ? '2px solid #be25a5' : '2px solid transparent',
    //             }}
    //         />
    //         <CardActionArea onClick={() => handleClick(date)} >
    //             <Card sx={{ minHeight: 200  }}>
    //                 {items.map((item, index) => (/*console.log(item), */
    //                     <>
    //                         <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //                             {date.split("-")[2]}
    //                         </Typography>
    //                         <CardContent key={index}>
    //                             <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
    //                                 {item.date}
    //                             </Typography>
    //                             <Typography sx={{ fontSize: 10 }} component="div">
    //                                 {item.description}
    //                             </Typography>
    //                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //                                 ${item.price}
    //                             </Typography>
    //                             <Typography sx={{ fontSize: 10 }} variant="body2">
    //                                 {item.category}
    //                                 <br />
    //                             </Typography>
    //                         </CardContent>
    //                     </>
    //                 ))}

    //             </Card>

    //         </CardActionArea>
    //     </Grid>

    // )
    const total = () => {
        return "$" + items.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid item xs={1}>
            <Card
                sx={{
                    position: 'relative',
                    backgroundColor: '#262626', // Charcoal color when not selected
                    outline: isSelected ? '3px solid #f0abfc' : '4px solid transparent',
                    aspectRatio: '1 / 1',
                    display: 'flex', // To ensure child elements are centered
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'flex-start',
                    boxShadow: '2px 2px 2px rgba(240, 171, 252, 0.3)', // Adds a medium box shadow
                    '&:hover': {
                        boxShadow: 'none', // Adds a larger shadow on hover
                    },
                }}
            >
                <CardActionArea
                    onClick={handleClickOpen}
                    sx={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        flexDirection: 'column',
                        // justifyContent: 'start',
                        // alignItems: 'flex-start',
                        // height: "100%"
                    }}
                >
                    <div className="flex flex-col justify-start h-full">
                        <div className="flex justify-between w-full px-1 pt-0.5">
                            <Typography sx={{ fontSize: 15 }} color={allOn ? '#e5e5e5' : (isSelected ? "#e5e5e5" : '#737373')}>
                                {date.split("-")[2]}
                            </Typography>
                            <Typography variant="bold" sx={{ fontSize: 20 }} color={allOn ? '#f0abfc' : (isSelected ? "#f0abfc" : '#525252')} >
                                {total()}
                            </Typography>
                        </div>
                        <div className="flex flex-col w-full px-0.5">
                            {items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex justify-between w-full px-0.5 rounded-sm my-0.5 align-middle" style={{
                                        background: allOn ? categories[item.category].color : (isSelected ? categories[item.category].color : "#404040")
                                    }}>
                                        <Typography sx={{ fontSize: 10 }} color={allOn ? '#fff' : (isSelected ? "#fff" : '#737373')}>
                                            {item.date.split(" ")[1].split(":").slice(0, 2).join(":")}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }} color="#fff">
                                            {categories[item.category].emoji}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color={allOn ? '#fff' : (isSelected ? "#fff" : '#737373')}>
                                            {item.description}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color={allOn ? '#fff' : (isSelected ? "#fff" : '#737373')}>
                                            ${Number(item.price).toFixed(2)}
                                        </Typography>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </CardActionArea>
                <DayModal
                    open={open} 
                    handleClose={handleClose} 
                    allOn={allOn} 
                    isSelected={isSelected} 
                    onClick={() => handleClick(date)}
                    items={items} 
                    categories={categories}
                    />
            </Card>


        </Grid>
    );
}

export default DateCard