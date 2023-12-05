/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LightMode } from '../utilities/LightMode';
import Logo from '../utilities/Logo';

function Signup({ lightMode, setLightMode }) {
  const [pressed, setPressed] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    email: 'example@example.com',
    username: 'randomUsername1',
    password: 'Password1',
    confirmPassword: 'Password1',
  });

  // Send form data to server
  const signupForm = async () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 200);
    const signupRequest = await fetch('http://localhost:8081/signup', {
      method: 'POST',
      body: JSON.stringify(signupInfo),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const signupResponse = await signupRequest.json();
    return console.log(signupResponse);
  };

  // Signup info
  const signup = [
    {
      state: signupInfo.email,
      inputId: 'email',
      inputType: 'email',
      placeholder: 'Email',
      placeholderImg: 'bi-envelope-fill',
    },
    {
      state: signupInfo.username,
      inputId: 'username',
      inputType: 'text',
      placeholder: 'Username',
      placeholderImg: 'bi-person-fill',
    },
    {
      state: signupInfo.password,
      inputId: 'password',
      inputType: 'password',
      placeholder: 'Password',
      placeholderImg: 'bi-lock-fill',
    },
    {
      state: signupInfo.confirmPassword,
      inputId: 'confirmPassword',
      inputType: 'password',
      placeholder: 'Confirm Password',
      placeholderImg: 'bi-lock-fill',
    },
  ];

  return (
    <form
      method="POST"
      className={`
        d-flex w-100 h-100
        justify-content-center
      `}
    >
      <div
        className={`
          d-flex flex-column flex-grow-1
          p-5 pt-5 pb-0 align-items-center
          justify-content-between gap-5
        `}
      >
        <Logo />
        <div
          style={{ maxWidth: '500px' }}
          className={`
            d-flex flex-wrap gap-2 w-100
            justify-content-center
          `}
        >
          {signup.map((obj) => (
            <label
              key={obj.inputId}
              htmlFor={obj.inputId}
              style={{ maxWidth: '200px' }}
              className={`
                d-flex w-100
                align-items-center
                rounded border m-0 pt-2 pb-2
                position-relative
              `}
            >
              <i
                className={`
                  p-3 pt-0 pb-0 z-1
                  ${obj.placeholderImg}
                `}
                style={{ fontSize: '1.15rem' }}
              />
              <input
                id={obj.inputId}
                type={obj.inputType}
                value={obj.state}
                placeholder={obj.placeholder}
                className={`
                  form-control w-100
                  border position-absolute m-0
                  h-100 pt-3 pb-3
                `}
                onChange={(e) => {
                  setSignupInfo({
                    ...signup,
                    [obj.inputId]: e.target.value,
                  });
                }}
                style={{ paddingLeft: '3rem' }}
              />
            </label>
          ))}
          <motion.button
            type="button"
            animate={pressed ? 'open' : 'closed'}
            transition={{ duration: 0.4 }}
            variants={{
              open: { scale: 0.75 },
              closed: { scale: 1 },
            }}
            onClick={() => signupForm()}
            style={{
              transition: '0s',
              maxWidth: '200px',
            }}
            className={`
              btn btn-${lightMode} p-3 pt-2 pb-2
              mt-2 w-100 border-0
            `}
          >
            Signup
          </motion.button>
        </div>
        <div
          className={`
            d-flex align-items-center
            small gap-2 pb-5
          `}
        >
          <div>Have an account?</div>
          <Link
            to="/login"
            className={`
              link link-primary
              m-0 p-2 pt-1 pb-1
              shadow-none border-0 rounded
            `}
          >
            Login
          </Link>
        </div>
        <LightMode
          lightMode={lightMode}
          setLightMode={setLightMode}
        />
      </div>
    </form>
  );
}

export default Signup;
