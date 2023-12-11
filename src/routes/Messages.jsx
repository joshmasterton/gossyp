/* eslint-disable react/prop-types */
import React from 'react';
import Loading from '../utilities/Loading';

export default function Messages({
  messages,
  bottomRef,
  lightMode,
  loadingMessages,
  user,
}) {
  if (loadingMessages) {
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
  return (
    <div
      className={`
        d-flex flex-column w-100 h-100 p-3 gap-3
      `}
    >
      {messages?.map((obj) => (
        <div
          key={obj.id}
          className="d-flex flex-column gap-1"
        >
          <div
            className={`
              d-flex w-75 gap-3
              align-items-center
              ${user.name === obj.username ? 'flex-row-reverse' : ''}
              ${user.name === obj.username ? 'align-self-end' : ''}
              overflow-hidden
            `}
          >
            <img
              alt="user pic"
              src={obj.userimg}
              className="rounded-circle"
              width="35rem"
            />
            <div
              className={`
                p-4 pt-3 pb-3 text-break flex-grow-1 rounded
                ${user.name === obj.username ? 'align-self-start' : ''}  
                bg-${lightMode}
              `}
            >
              {obj.message}
            </div>
          </div>
          <div
            className={`
              ${user.name === obj.username ? 'align-self-end' : ''}  
              small opacity-50 d-flex gap-1
            `}
          >
            <div>{`${obj.username} -`}</div>
            {new Date(obj.created_on).toLocaleTimeString()}
          </div>
        </div>
      ))}
      <div className="p-0 pb-5" />
      <div ref={bottomRef} className="p-1 pb-2" />
    </div>
  );
}
