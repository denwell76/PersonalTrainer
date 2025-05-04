import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useState } from 'react';
import { Customer } from '../types';
import { updateCustomer } from '../api';

type EditCustomerProps = {
  data: Customer;
  fetchCustomers: () => void;
};

export default function EditCustomer({ data, fetchCustomers }: EditCustomerProps) {
  const [customer, setCustomer] = useState<Customer>(data);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setCustomer(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await updateCustomer(data._links.self.href, customer);
      fetchCustomers();
      handleClose();
    } catch (err) {
      console.error('Error updating customer:', err);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
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
          <TextField
            required
            margin="dense"
            name="phone"
            value={customer.phone || ''}
            onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
            label="Phone"
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