/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { getLightMode, switchLightMode } from './LightMode';

export default function Menu({
  user,
  isMenu,
  setIsMenu,
  lightMode,
  setLightMode,
}) {
  const { logout } = useAuth0();
  const [nav, setNav] = useState([
    {
      id: 0,
      img: null,
      pic: user?.picture,
      pressed: false,
    },
    {
      id: 1,
      img: 'bi-door-closed-fill',
      logout: true,
      pressed: false,
      name: 'Logout',
    },
    {
      id: 2,
      img: 'bi-moon-fill',
      light: true,
      pressed: false,
      name: 'Light Mode',
    },
    {
      id: 3,
      img: 'bi-x-lg',
      exit: true,
      pressed: false,
      name: 'Close',
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
    <img
      alt="user pic"
      src={user?.picture}
      style={{ width: '2.5rem' }}
      className={`
        d-flex rounded-circle
      `}
    />
  );

  const navLogo = (obj) => (
    <i
      className={obj.img}
      style={{ fontSize: '1.5rem' }}
    />
  );

  return (
    <>
      <motion.button
        type="button"
        animate={isMenu ? 'open' : 'closed'}
        transition={{ duration: 0 }}
        initial={{ scale: 0 }}
        variants={{
          open: { scale: 1 },
          closed: { scale: 0 },
        }}
        onClick={() => setIsMenu(false)}
        className={`
          w-100 h-100 btn position-absolute
          border-0 z-2 rounded
        `}
        style={{
          transition: 'all 0s',
          backdropFilter: 'blur(0.5rem)',
          WebkitBackdropFilter: 'blur(0.5rem)',
        }}
      />
      <motion.nav
        initial={{ x: '-150%' }}
        animate={isMenu ? 'open' : 'closed'}
        transition={{ duration: 0 }}
        variants={{
          open: { x: 0 },
          closed: { x: '-150%' },
        }}
        className={`
          d-flex flex-column pe-auto z-3
          rounded h-100 flex-wrap w-75
          position-absolute overflow-hidden

        `}
        style={{
          transition: 'all 0.4s',
          maxWidth: '5rem',
          backdropFilter: 'blur(0.5rem)',
          WebkitBackdropFilter: 'blur(0.5rem)',
        }}
      >
        <div
          className={`
            w-100 h-100 rounded opacity-75
            position-absolute bg-${lightMode}
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
              if (obj.light) {
                switchLightMode();
                setLightMode(getLightMode());
              }
              if (obj.exit) {
                setIsMenu(false);
              }
            }}
            style={{
              transition: 'all 0s',
            }}
            className={`
              d-flex border-0 w-100
              position-relative p-3 pt-3 pb-3
              align-items-center btn gap-2
              justify-content-center
              overflow-hidden flex-wrap
            `}
          >
            {obj.pic ? userPicture() : navLogo(obj)}
          </motion.button>
        ))}
      </motion.nav>
    </>
  );
}
