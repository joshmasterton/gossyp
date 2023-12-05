/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Nav() {
  const [nav, setNav] = useState([
    { id: 0, img: 'bi-circle-fill', pressed: false },
    { id: 1, img: 'bi-xbox', pressed: false },
    { id: 2, img: 'bi-circle-fill', pressed: false },
    { id: 3, img: 'bi-circle-fill', pressed: false },
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

  return (
    <div
      className={`
        w-100 d-flex fixed-bottom
        justify-content-center
        bg-primary colorImg
      `}
    >
      <nav
        className={`
          d-flex flex-grow-1 rounded p-2
        `}
        style={{ maxWidth: '25rem' }}
      >
        {nav.map((obj) => (
          <motion.button
            key={obj.id}
            id={obj.id}
            type="button"
            animate={obj.pressed ? 'open' : 'closed'}
            transition={{ duration: 0 }}
            variants={{
              open: { scale: 0.5 },
              closed: { scale: 1 },
            }}
            onClick={() => pressDown(obj)}
            style={{
              transition: 'all 0.4s',
              maxWidth: '200px',
            }}
            className={`
              flex-grow-1 text-white
              border-0 p-3 pt-2 pb-2
              bg-transparent
            `}
          >
            <i
              className={obj.img}
              style={{ fontSize: '1.15rem' }}
            />
          </motion.button>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
