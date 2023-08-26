
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dropzone from 'react-dropzone';

const UpdatePictureDialog = ({ open, onClose, onImageSelect, onPictureUpdate }) => {
  const { userId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    onImageSelect(acceptedFiles[0]);
  };

  const handleUpdateImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('picture', selectedImage);

      try {
        const response = await fetch(`http://localhost:6001/user/${userId}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          onPictureUpdate();
          console.log('User picture updated successfully');
        } else {
          console.log('Error updating user picture');
        }
      } catch (error) {
        console.error('Error updating user picture:', error);
      }
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Profile Picture</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
          Select an image to update your profile picture:
        </Typography>
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={handleImageSelect}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed `}
              p="1rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!selectedImage ? (
                <p>Click or drag an image to upload</p>
              ) : (
                <Typography>{selectedImage.name}</Typography>
              )}
            </Box>
          )}
        </Dropzone>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleUpdateImage}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePictureDialog;
