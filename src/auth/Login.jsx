/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LightMode } from '../utilities/LightMode';
import Logo from '../utilities/Logo';

function Login({ lightMode, setLightMode }) {
  const [pressed, setPressed] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: 'example@example.com',
    password: 'Password1',
  });

  // Send form data to server
  const loginForm = async () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 200);
    try {
      const loginRequest = await fetch('http://localhost:8081/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const loginResponse = await loginRequest.json();
      return console.log(loginResponse);
    } catch (err) {
      return console.log(err.message);
    }
  };

  // Login info
  const login = [
    {
      state: loginInfo.email,
      inputId: 'email',
      inputType: 'email',
      placeholder: 'Email',
      placeholderImg: 'bi-envelope-fill',
    },
    {
      state: loginInfo.password,
      inputId: 'password',
      inputType: 'password',
      placeholder: 'Password',
      placeholderImg: 'bi-lock-fill',
    },
  ];

  return (
    <form
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
          {login.map((obj) => (
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
                placeholder={obj.placeholder}
                value={obj.state}
                onChange={(e) => {
                  setLoginInfo({
                    ...login,
                    [obj.inputId]: e.target.value,
                  });
                }}
                className={`
                  form-control w-100
                  border position-absolute m-0
                  h-100 pt-2 pb-2
                `}
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
            onClick={() => loginForm()}
            className={`
              btn btn-${lightMode} p-3 pt-2 pb-2
              mt-2 w-100 border-0
            `}
            style={{
              transition: '0s',
              maxWidth: '200px',
            }}
          >
            Login
          </motion.button>
        </div>
        <div
          className={`
            d-flex align-items-center
            small gap-2 pb-5
          `}
        >
          <div>Need an account?</div>
          <Link
            to="/signup"
            className={`
              link link-primary
              m-0 p-2 pt-1 pb-1 shadow-none
              border-0 rounded
            `}
          >
            Signup
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

export default Login;
