import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UserDetailsPage from './pages/UserDetails';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
