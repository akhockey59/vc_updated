import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SocketContext } from '../Context'; // Ensure the path is correct

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useContext(SocketContext);

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children components
  return children;
};

export default AuthRoute;
