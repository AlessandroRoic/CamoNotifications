import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Notification, NotificationType } from './components/Notification';

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  const randomColor = (): number => Math.floor(Math.random() * (255 - 1 + 1) + 1);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        open
      </button>
      <button
        type="button"
        onClick={() => {
          document.body.style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
          document.body.style.color = 'white';
        }}
      >
        change background
      </button>
      <p style={{ fontSize: '35px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum
      </p>
      <Notification
        id="test"
        notificationType={NotificationType.COOKIE}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);
