/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import Menu from './Menu';
import WriteMessage from '../routes/WriteMessage';

function Nav({
  user,
  isNav,
  setIsNav,
  fetchMessages,
  lightMode,
  setLightMode,
  bottomRef,
}) {
  const { logout } = useAuth0();
  const [isMenu, setIsMenu] = useState(false);
  const [isWriteMessage, setIsWriteMessage] = useState(false);
  const [nav, setNav] = useState([
    {
      id: 0,
      img: 'bi-list',
      menu: true,
      pressed: false,
    },
    {
      id: 1,
      add: true,
      img: `
        bi-plus-lg
      `,
      pressed: false,
    },
    {
      id: 2,
      img: null,
      pic: user?.picture,
      pressed: false,
    },
    {
      id: 3,
      img: 'bi-door-closed-fill',
      logout: true,
      pressed: false,
    },
  ]);

  const pressDown = (obj) => {
    const tempNav = [...nav];
    tempNav[obj.id].pressed = true;
    setNav(tempNav);
    const updatedNav = [...nav];
    setTimeout(() => {
      updatedNav.forEach((obj2) => {
        updatedNav[obj2.id].pressed = false;
      });
      setNav(updatedNav);
    }, 200);
  };

  const userPicture = () => (
    <>
      <img
        alt="user pic"
        src={user?.picture}
        className="rounded-circle position-absolute"
        width="30rem"
      />
      <div className="p-2 pt-2 pb-2" />
    </>
  );

  const navLogo = (obj) => (
    <i
      className={obj.img}
      style={{ fontSize: '1.5rem' }}
    />
  );

  return (
    <>
      <motion.nav
        initial={{ x: '-150%' }}
        animate={isNav ? 'open' : 'closed'}
        transition={{ duration: 0 }}
        variants={{
          open: { x: 0 },
          closed: { x: '-150%' },
        }}
        className={`
          d-flex flex-grow-1 bottom-0 w-100 rounded
          justify-content-center flex-wrap z-1
          overflow-hidden position-absolute
        `}
        style={{
          maxHeight: '4.25rem',
          transition: 'all 0.6s',
          backdropFilter: 'blur(0.5rem)',
          WebkitBackdropFilter: 'blur(0.5rem)',
        }}
      >
        <div
          className={`
            w-100 h-100 opacity-75
            bg-${lightMode} position-absolute
          `}
        />
        {nav.map((obj) => (
          <motion.button
            key={obj.id}
            id={obj.id}
            type="button"
            whileHover={{ opacity: 0.5 }}
            animate={obj.pressed ? 'open' : 'closed'}
            transition={{ duration: 0.4 }}
            variants={{
              open: { scale: 0.5 },
              closed: { scale: 1 },
            }}
            onClick={() => {
              pressDown(obj);
              if (obj.logout) {
                logout({
                  logoutParams: {
                    returnTo: `${window.location.origin}/gossyp/`,
                  },
                });
              }
              if (obj.menu) setIsMenu(true);
              if (obj.add) {
                setIsWriteMessage(true);
                setIsNav(false);
              }
            }}
            style={{
              transition: 'all 0s',
              maxWidth: '5rem',
            }}
            className={`
              flex-grow-1 d-flex
              border-0 p-4 pt-3 pb-3
              position-relative z-2
              align-items-center btn
              justify-content-center
            `}
          >
            {obj.pic ? userPicture() : navLogo(obj)}
          </motion.button>
        ))}
      </motion.nav>
      <Menu
        user={user}
        isMenu={isMenu}
        setIsMenu={setIsMenu}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
      <WriteMessage
        user={user}
        setIsNav={setIsNav}
        isWriteMessage={isWriteMessage}
        setIsWriteMessage={setIsWriteMessage}
        lightMode={lightMode}
        fetchMessages={fetchMessages}
        bottomRef={bottomRef}
      />
    </>
  );
}

export default Nav;
