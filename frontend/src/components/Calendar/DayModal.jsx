import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Card, CardContent, Typography } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import PieChart from './PieChart';

const DayModal = ({ open, handleClose, allOn, isSelected, onClick, items, categories }) => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const totalSpent = items.length ? items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2) : '0.00';
    const avgSpent = items.length ? (totalSpent / items.length).toFixed(2) : '0.00';

    const categoryCount = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentCategory = items.length ? Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b) : 'N/A';

    const avgSpentPerCategory = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + parseFloat(item.price);
        return acc;
    }, {});

    const date = items.length ? new Date(items[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

    return (
        <React.Fragment>
            <Button
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    bottom: '1px',
                    left: '1px',
                    zIndex: 1,
                    padding: 0.5,
                    minWidth: 0,
                    minHeight: 0,
                    color: allOn ? '#fff' : (isSelected ? "#f0abfc" : '#737373'),
                }}
            >
                {isSelected ? (
                    <RadioButtonCheckedIcon sx={{ color: '#f0abfc', fontSize: 15 }} />
                ) : (
                    <RadioButtonUncheckedIcon sx={{ color: '#737373', fontSize: 15 }} />
                )}
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "#171717",
                        color: "#fff",
                        boxShadow: "6px 6px 6px rgba(240,172,242, 0.6)"
                    }
                }}
            >
                <DialogTitle variant="bold">{date}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                            <Timeline position="right">
                                {items.map((item, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineOppositeContent color="pink">
                                            {item["date"].split(" ")[1].slice(0, 5)}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <span style={{ fontSize: '1.9rem' }}>{categories[item["category"]].emoji}</span>
                                            {index < items.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box sx={{
                                                backgroundColor: categories[item["category"]].color,
                                                padding: '0rem 0.5rem',
                                                borderRadius: '5px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '1rem',
                                                fontWeight: 'bold'
                                            }}>
                                                <Box component="span" sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant='body1'
                                                        sx={{
                                                            color: '#fdf4ff',
                                                            textShadow: '0px 0px 10px #4A044E'
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                                <Box component="span" sx={{ color: '#f0abfc', marginLeft: '10px', fontWeight: 'bold' }}>
                                                    <Typography
                                                        variant="priceModal"
                                                        sx={{
                                                            color: '#fdf4ff',
                                                            marginLeft: '10px',
                                                            textShadow: '0px 0px 10px #4A044E'
                                                        }}
                                                    >
                                                        ${parseFloat(item["price"]).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </Box>
                        <Box sx={{ width: '35%', height: '300px', marginBottom: 2 }}>
                            <PieChart items={items} categories={categories} />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Card sx={{ marginBottom: 2, padding: 2, backgroundColor: '#222222', color: '#fff' }}>
                            <CardContent>
                                <Typography variant="h6">Total Transactions: {items.length}</Typography>
                                <Typography variant="h6">Total Spent: ${totalSpent}</Typography>
                                <Typography variant="h6">Average Spent per Transaction: ${avgSpent}</Typography>
                                <Typography variant="h6">Most Frequent Category: {mostFrequentCategory}</Typography>
                                <Typography variant="h6">Average Spent per Category:</Typography>
                                {Object.keys(avgSpentPerCategory).map(category => (
                                    <Typography key={category} variant="body2" sx={{ marginLeft: 2 }}>
                                        {categories[category].name}: ${avgSpentPerCategory[category].toFixed(2)}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                        color: "#f0abfc",
                        padding: 0.5,
                        minWidth: 0,
                    }}><CloseRoundedIcon /></Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DayModal;
