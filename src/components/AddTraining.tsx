import { useState } from 'react';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { addTraining } from '../api';

type AddTrainingProps = {
  fetchTrainings: () => void;
  customerLink: string;
};

export default function AddTraining({ fetchTrainings, customerLink }: AddTrainingProps) {
  const [training, setTraining] = useState({
    date: dayjs(new Date().toISOString()).format('YYYY-MM-DDTHH:mm'),
    duration: '',
    activity: '',
    customer: customerLink,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTraining({ ...training, [name]: value });
  };

  const saveTraining = async () => {
    if (!training.activity || !training.duration || !training.date || !training.customer) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await addTraining({
        ...training,
        duration: Number(training.duration),
      });
      fetchTrainings();
      handleClose();
    } catch (err) {
      console.error('Error saving training:', err);
      alert('Failed to add training. Please try again.');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="datetime-local"
            name="date"
            value={training.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Duration (minutes)"
            type="number"
            name="duration"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}