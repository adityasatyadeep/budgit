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

const DayModal = ({ open, handleClose, allOn, isSelected, onClick, items }) => {
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
                    <DialogContentText>
                        WOW
                    </DialogContentText>
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