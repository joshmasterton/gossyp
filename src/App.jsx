import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { getLightMode } from './utilities/LightMode';
import Login from './auth/Login';
import Signup from './auth/Signup';

function App() {
  const [lightMode, setLightMode] = useState(getLightMode());
  const router = createHashRouter([
    {
      path: '/',
      element: <Login
        lightMode={lightMode}
        setLightMode={setLightMode}
      />,
    },
    {
      path: '/login',
      element: <Login
        lightMode={lightMode}
        setLightMode={setLightMode}
      />,
    },
    {
      path: '/signup',
      element: <Signup
        lightMode={lightMode}
        setLightMode={setLightMode}
      />,
    },
  ], { basename: '/' });

  return (
    <RouterProvider router={router} />
  );
}

export default App;
