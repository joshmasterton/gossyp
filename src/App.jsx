/* eslint-disable react/prop-types */
import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import { getLightMode } from './utilities/LightMode';
import Login from './auth/Login';
import Nav from './utilities/Nav';
import Loading from './utilities/Loading';
import Messages from './routes/Messages';

function NavWrapper({
  isNav,
  setIsNav,
  user,
  lightMode,
  setLightMode,
  fetchMessages,
  bottomRef,
}) {
  return (
    <>
      <Nav
        isNav={isNav}
        setIsNav={setIsNav}
        user={user}
        lightMode={lightMode}
        setLightMode={setLightMode}
        fetchMessages={fetchMessages}
        bottomRef={bottomRef}
      />
      <Outlet />
    </>
  );
}

function App() {
  const bottomRef = useRef();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState(null);
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [isNav, setIsNav] = useState(true);
  const [lightMode, setLightMode] = useState(getLightMode());

  const fetchMessages = async () => {
    const retrieve = await fetch('https://gossyp-api.fly.dev/getMessages', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      credentials: 'include',
    });
    const response = await retrieve.json();
    setMessages(response);
    return setLoadingMessages(false);
  };

  useEffect(() => async () => {
    await fetchMessages();
  }, [isNav, user, isLoading, isAuthenticated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  });

  const router = createHashRouter([
    {
      path: '/',
      element: <NavWrapper
        isNav={isNav}
        setIsNav={setIsNav}
        user={user}
        lightMode={lightMode}
        setLightMode={setLightMode}
        fetchMessages={fetchMessages}
        bottomRef={bottomRef}
      />,
      children: [
        {
          path: '/',
          element: <Messages
            user={user}
            lightMode={lightMode}
            messages={messages}
            bottomRef={bottomRef}
            loadingMessages={loadingMessages}
          />,
        },
      ],
    },
  ], { basename: '/' });

  if (isLoading) {
    return (
      <div
        className={`
          d-flex justify-content-center
          w-100 h-100 pb-5
        `}
      >
        <Loading lightMode={lightMode} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Login
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
    );
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
