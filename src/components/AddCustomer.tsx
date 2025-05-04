import { Customer } from '../types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';
import { addCustomer } from '../api';

type AddCustomerProps = {
  fetchCustomers: () => void;
};

export default function AddCustomer({ fetchCustomers }: AddCustomerProps) {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await addCustomer(customer);
      fetchCustomers();
      handleClose();
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="firstname"
            value={customer.firstname || ''}
            onChange={(event) => setCustomer({ ...customer, firstname: event.target.value })}
            label="First name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="lastname"
            value={customer.lastname || ''}
            onChange={(event) => setCustomer({ ...customer, lastname: event.target.value })}
            label="Last name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress || ''}
            onChange={(event) => setCustomer({ ...customer, streetaddress: event.target.value })}
            label="Street address"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="postcode"
            value={customer.postcode || ''}
            onChange={(event) => setCustomer({ ...customer, postcode: event.target.value })}
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="city"
            value={customer.city || ''}
            onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="email"
            value={customer.email || ''}
            onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
            label="Email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}