import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import SubmitButton from '../SubmitButton';
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

    const timelineItems = [
        { time: "09:30 am", content: "Eat" },
        { time: "10:00 am", content: "Code" },
        { time: "12:00 am", content: "Sleep" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" },
        { time: "9:00 am", content: "Repeat" }
    ];

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
                <DialogTitle>$$$</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                            <Timeline position="right">
                                {items.map((item, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineOppositeContent color="pink">
                                            {item["date"].split(" ")[1].slice(0, 5)}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <span style={{ fontSize: '1.3rem' }}>{categories[item["category"]].emoji}</span>
                                            {index < items.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>{item["description"]}, ${parseFloat(item["price"]).toFixed(2)}</TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </Box>
                        <Box sx={{ width: '40%', minWidth: 300 }}>
                            <PieChart items={items} categories={categories}/>
                        </Box>
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

export default DayModal