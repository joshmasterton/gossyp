/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { motion } from 'framer-motion';

// Get current light mode and return value
export const getLightMode = () => {
  const htmlTag = document.documentElement;
  // Is theme existing locally
  // If not create localstorage item
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set to dark
  if (localStorage.getItem('theme') === 'dark') {
    htmlTag.setAttribute('data-bs-theme', 'dark');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set to light
  if (localStorage.getItem('theme') === 'light') {
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  return null;
};

// Switch current light mode and return value
export const switchLightMode = () => {
  const htmlTag = document.documentElement;
  // Set light mode to light
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set light mode to dark
  if (localStorage.getItem('theme') === 'light') {
    localStorage.setItem('theme', 'dark');
    htmlTag.setAttribute('data-bs-theme', 'dark');
    return htmlTag.getAttribute('data-bs-theme');
  }
  return null;
};

export function LightMode({
  lightMode,
  setLightMode,
}) {
  return (
    <button
      type="button"
      className={`
        btn btn-transparent d-flex
        end-0 top-0 p-3 pt-1 pb-1 position-fixed
        align-self-end m-2 border
      `}
      style={{ transition: 'all 0s' }}
      onClick={() => {
        switchLightMode();
        setLightMode(getLightMode());
      }}
    >
      <motion.div
        variants={{
          open: { x: '-22.5%' },
          closed: { x: '22.5%' },
        }}
        initial={lightMode === 'dark' ? 'open' : 'closed'}
        animate={lightMode === 'dark' ? 'open' : 'closed'}
        transition={{ duration: 0.4 }}
        className={`
          btn btn-${lightMode === 'dark' ? 'dark' : 'light'}
          p-3 pt-1 pb-1 rounded border-0
        `}
        style={{
          fontSize: '1.15rem',
          transition: 'all 0s',
        }}
      >
        <i
          className={`
            bi-${lightMode === 'dark' ? 'moon-fill' : 'sun-fill'}
            text-${lightMode === 'dark' ? 'light' : 'dark'}          
          `}
        />
      </motion.div>
    </button>
  );
}
