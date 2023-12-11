/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '../utilities/Loading';

export default function WriteMessage({
  user,
  setIsNav,
  lightMode,
  isWriteMessage,
  setIsWriteMessage,
  fetchMessages,
  bottomRef,
}) {
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [message, setMessage] = useState('');

  const onInputChange = (e) => setMessage(e.target.value);

  const onMessageSend = async (e) => {
    e.preventDefault();
    setPressed(true);
    setLoadingMessage(true);
    setTimeout(() => setPressed(false), 200);
    const sendMessage = await fetch('https://gossyp-api.fly.dev/sendMessage', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        message,
        user: user.name,
        userImg: user.picture,
      }),
    });
    await sendMessage.json();
    await fetchMessages();
    setMessage('');
    return setLoadingMessage(false);
  };

  return (
    <motion.form
      initial={{ x: '150%' }}
      animate={isWriteMessage ? 'open' : 'closed'}
      transition={{ duration: 0 }}
      variants={{
        open: { x: 0 },
        closed: { x: '150%' },
      }}
      method="POST"
      className={`
          d-flex flex-grow-1 rounded
          overflow-hidden position-absolute
          bottom-0 w-100 z-1
        `}
      style={{
        transition: 'all 0.4s',
        backdropFilter: 'blur(0.5rem)',
        WebkitBackdropFilter: 'blur(0.5rem)',
      }}
    >
      <div
        className={`
            bg-${lightMode} position-absolute
            h-100 w-100 opacity-75
          `}
      />
      <motion.button
        type="button"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.4 }}
        onClick={() => {
          setIsWriteMessage(false);
          setIsNav(true);
        }}
        className={`
            align-self-end btn
            p-4 pt-3 pb-3 border-0 z-2
          `}
      >
        <i
          className="bi-arrow-left"
          style={{ fontSize: '1.5rem' }}
        />
      </motion.button>
      <input
        type="text"
        value={message}
        onChange={(e) => onInputChange(e)}
        onClick={() => setTimeout(() => {
          bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          });
        }, 100)}
        placeholder="Write message..."
        className={`
            border-0 rounded pt-3 pb-3
            flex-grow-1 z-2 bg-transparent
          `}
        style={{
          outline: 0,
          width: '100%',
        }}
      />
      {loadingMessage
        ? (
          <div
            className={`
                d-flex justify-content-center z-1
              `}
          >
            <Loading lightMode={lightMode} />
          </div>
        )
        : (
          <motion.button
            type="submit"
            whileHover={{ opacity: 0.5 }}
            animate={pressed ? 'open' : 'closed'}
            transition={{ duration: 0.4 }}
            variants={{
              open: { scale: 0.5 },
              closed: { scale: 1 },
            }}
            onClick={(e) => onMessageSend(e)}
            className={`
                align-self-end btn
                p-4 pt-3 pb-3 border-0 z-2
              `}
          >
            <i
              className="bi-send-fill"
              style={{ fontSize: '1.5rem' }}
            />
          </motion.button>
        )}
    </motion.form>
  );
}
