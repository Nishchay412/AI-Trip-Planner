import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import "./input.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Ensure these are imported
import { Planner } from './components/ui/planner.jsx';
import { Signup } from './components/ui/signup.jsx';
import { Results } from './components/ui/details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/trip",
    element:<Planner/>,
  },
  {
    path:"/signup",
    element:<Signup/>,
  },
  {path:"/planner",
  element: <Results/>,
}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="58816521100-enjkbt7oab649ievfdgrkv37h1iv4ofg.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);