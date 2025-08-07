import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  Register,
  Login,
  Dashboard,
  Admin,
  Donors,
  BloodRequests,
  Profile
} from './pages';
import { Navbar, PrivateRoute, AdminRoute } from './components';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/requests" element={<BloodRequests />} />
        
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
