/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';

function Login({ lightMode }) {
  const { loginWithRedirect } = useAuth0();
  const [pressed, setPressed] = useState(false);

  // Send form data to server
  const loginWithAuth = async () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 200);
    loginWithRedirect();
  };

  return (
    <div
      className={`
        w-100 h-100 d-flex flex-column gap-2
        align-items-center 
        justify-content-center
      `}
    >
      <motion.button
        type="button"
        animate={pressed ? 'open' : 'closed'}
        transition={{ duration: 0.4 }}
        variants={{
          open: { scale: 0.5 },
          closed: { scale: 1 },
        }}
        onClick={() => loginWithAuth()}
        className={`
          d-flex btn p-0 border-0
          position-relative
        `}
        style={{
          transition: '0s',
          maxWidth: '200px',
        }}
      >
        <motion.i
          whileHover={{ opacity: 0.5 }}
          className={`
            rounded bi-door-open-fill p-4 pt-3 pb-3
            z-2
          `}
          style={{ fontSize: '1.5rem' }}
        />
        <div
          className={`
            w-100 h-100 rounded opacity-75
            bg-${lightMode} position-absolute
          `}
        />
      </motion.button>
    </div>
  );
}

export default Login;
