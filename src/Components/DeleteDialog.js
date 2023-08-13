import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function DeleteDialog({onClose, onDelete, title}) {

    return (
      <Dialog
          open={true}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id="alert-dialog-title">Delete toDo </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure you want to delete ${title}?`}
              </DialogContentText>   
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>)
        }

export default DeleteDialog;