import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Assignments from './pages/Assignments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import loader from './assets/loader.gif'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// PrivateRoute component
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

// Loader component
function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-armygreen">
      <div className="flex flex-col items-center">
        <img src={loader} alt="Loading..." className="w-48 h-48" />
        <p className="text-offwhite mt-4 font-bold">Indian Army Assets Loading...</p>
      </div>
    </div>
  );
}


// Wrapper to conditionally show Navbar + routes + loader logic
function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      if (location.pathname === '/') {
        navigate('/'); // stay or move to login
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard refreshTrigger={refreshTrigger} />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <PrivateRoute>
                <Purchases setRefreshTrigger={setRefreshTrigger} />
              </PrivateRoute>
            }
          />
          <Route
            path="/transfers"
            element={
              <PrivateRoute>
                <Transfers setRefreshTrigger={setRefreshTrigger} />
              </PrivateRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <PrivateRoute>
                <Assignments setRefreshTrigger={setRefreshTrigger} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
