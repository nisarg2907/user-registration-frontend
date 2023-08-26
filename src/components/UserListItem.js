import React from 'react';
import { useNavigate} from "react-router-dom";
import { Card, CardContent, Typography, Avatar } from '@mui/material';


const UserListItem = ({ user }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/user/${user._id}`);
    };
     
  console.log(user._id);
  return (
    <Card onClick={handleClick} sx={{ margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Avatar
        sx={{ width: '100px', height: '100px', marginBottom: '0.5rem' }}
        alt={`${user.firstName} ${user.lastName}`}
        src={`https://app-backend-3zfc.onrender.com/assets/${user.picturePath}`}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>{user.firstName} {user.lastName}</Typography>
        <Typography variant="subtitle1" gutterBottom>{user.occupation}</Typography>
        <Typography variant="body2" color="textSecondary">{user.email}</Typography>
      </CardContent>
    </Card>
  );
  
  };

  export default UserListItem; 