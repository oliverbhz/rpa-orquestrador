import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from '../components/PrivateRoute';
import AppLayout from '../layout/AppLayout';

export const router = createBrowserRouter([
  { 
    path: '/login', 
    element: <Login /> 
  },
  {
    path: '/',
    element: <PrivateRoute><AppLayout /></PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
]);
