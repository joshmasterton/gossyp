/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

function Loading({ lightMode }) {
  return (
    <div
      style={{ maxWidth: '4.5rem' }}
      className={`
        d-flex align-items-center
        align-self-center p-4 pt-3 pb-3
        justify-content-center h-100
      `}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: 'infinite',
          ease: 'linear',
        }}
        style={{
          border: `
            8px solid
            ${lightMode === 'dark' ? '#27292f' : '#f4f4f7'}
          `,
        }}
        className={`
          p-2 rounded-circle position-absolute
        `}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: 'infinite',
          ease: 'linear',
        }}
        style={{
          borderTop: `
            8px solid
            ${lightMode === 'dark' ? '#f4f4f7' : '#27292f'}
          `,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid transparent',
        }}
        className={`
          p-2 rounded-circle
        `}
      />
    </div>
  );
}

export default Loading;
