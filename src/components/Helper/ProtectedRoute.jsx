import React from 'react';
import { Navigate } from 'react-router-dom';
import { CustomerContext } from '@/CustomerContext';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(CustomerContext);
  return login ? children : <Navigate to="/busca" />;
};

export default ProtectedRoute;
