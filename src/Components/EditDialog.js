import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';




function EditDialog({onClose, onUpdate, initialValue}) {
const [inputValue, setInputValue] = useState(initialValue)

const onChange = (e) => {
    setInputValue(e.target.value)
}
    return (
        <Dialog
            open={true}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id="alert-dialog-title">Edit toDo </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TextField
                        onChange={onChange}
                        value={inputValue}
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => onUpdate(inputValue)} autoFocus>
                    Update
                </Button>
            </DialogActions>
        </Dialog>)
}

export default EditDialog;