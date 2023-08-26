

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Typography, Box, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdatePictureDialog from '../components/UpdatePictureDialog';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedOccupation, setUpdatedOccupation] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [openPictureDialog, setOpenPictureDialog] = useState(false);

  useEffect(() => {
    axios.get(`https://app-backend-3zfc.onrender.com/users/${userId}`)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateClick = () => {
    setOpenDialog(true);
  };

  const handleUpdateSubmit = async () => {
    if (
      updatedFirstName === user.firstName &&
      updatedLastName === user.lastName &&
      updatedEmail === user.email &&
      updatedOccupation === user.occupation &&
      updatedLocation === user.location
    ) {
      setOpenDialog(false);
      return;
    }

    const id = userId;
    const updatedUserData = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      occupation: updatedOccupation,
      location: updatedLocation,
    };

    try {
      await axios.put(`https://app-backend-3zfc.onrender.com/users/update-user/${id}`, updatedUserData);
      setOpenDialog(false);
      setUser({
        ...user,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        occupation: updatedOccupation,
        location: updatedLocation,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = () => {
    axios.delete(`https://app-backend-3zfc.onrender.com/users/${userId}`)
      .then(response => {
        console.log('User deleted successfully:', response.data.message);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handlePictureUpdate = () => {
    setUser(prevUser => ({
      ...prevUser,
      picturePath: selectedImage.name,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        <img
          src={`https://app-backend-3zfc.onrender.com/assets/${user.picturePath}`}
          alt={`${user.firstName} ${user.lastName}`}
          style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <Button variant="contained" startIcon={<UpdateIcon />} color="primary" sx={{ marginTop: '0.5rem' }} onClick={() => setOpenPictureDialog(true)}>
          Update Picture
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '1rem', width: '80%' }}>
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Occupation: {user.occupation}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {user.location}
        </Typography>
      </Paper>
      <Stack direction={'row'} justifyContent={'space-between'} gap={10}>
        <Button variant="contained" startIcon={<UpdateIcon />} color="primary" sx={{ marginTop: '0.5rem' }} onClick={handleUpdateClick}>
          Update User Information
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={deleteUser}>
          Delete User
        </Button>
      </Stack>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            variant="outlined"
            value={updatedFirstName}
            onChange={e => setUpdatedFirstName(e.target.value)}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          {/* Other input fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <UpdatePictureDialog
        open={openPictureDialog}
        onClose={() => setOpenPictureDialog(false)}
        onImageSelect={selectedImage => setSelectedImage(selectedImage)}
        onPictureUpdate={handlePictureUpdate}
      />
    </Container>
  );
};

export default UserDetails;
