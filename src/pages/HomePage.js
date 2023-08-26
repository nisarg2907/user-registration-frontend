import  { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterPage from './Register';
import React from 'react';
import UserListItem from '../components/UserListItem';
import { Button,Container,Paper } from '@mui/material';


const UserList = () => {
  const [users, setUsers] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
  const toggleRegisterForm = () => {
    setShowRegisterForm(prevState => !prevState);
  };
  useEffect(() => {
    axios.get('http://localhost:6001/users/all-users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
    <Button variant="contained" onClick={toggleRegisterForm}>Register a User</Button>
    {showRegisterForm && <RegisterPage />}
    <Paper sx={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
      {users.map(user => (
        <UserListItem key={user._id} user={user} />
      ))}
    </Paper>
  </Container>
);
  

};

export default UserList;