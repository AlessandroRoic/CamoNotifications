import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import { Notification, NotificationType, useCamoNotification } from './components/Notification/Notification';

function Main() {
  const { isOpen, toggle } = useCamoNotification();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button
        type="button"
        onClick={() => {
          toggle();
        }}
      >
        apri notifica
      </button>
      <button
        type="button"
        onClick={() => {
          document.body.style.backgroundColor = 'black';
          document.body.style.color = 'white';
        }}
      >
        cambia sfondo
      </button>
      <Notification id="test" type={NotificationType.COOKIE} isOpen={isOpen} onClose={toggle} content="Lorem ipsum dolor sit amet" />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);
