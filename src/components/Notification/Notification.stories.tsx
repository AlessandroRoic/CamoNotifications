import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Notification, NotificationProps, NotificationType } from './index';

const randomColor = (): number => Math.floor(Math.random() * (255 - 1 + 1) + 1);
function StorybookNotification(props: NotificationProps) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'Tahoma, sans-serif';
  }, []);
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          document.body.style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
        }}
      >
        change background
      </button>
      <Notification {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default {
  title: 'Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (props: NotificationProps) => {
  return <StorybookNotification {...props} />;
};

export const Cookie = Template.bind({});
Cookie.args = {
  id: 'cookie',
  notificationType: NotificationType.COOKIE,
  title: 'Warning',
  isOpen: true,
  subtitle: 'Accept Cookies',
  content: <button type="button"> click hero to accept cookies</button>,
};

export const Custom = Template.bind({});
Custom.args = {
  id: 'Custom',
  notificationType: NotificationType.CUSTOM,
  isOpen: true,
  title: 'Custom notification',
  subtitle: 'Accept Cookies',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  customStyle: {
    color: '#f8d207',
  },
};

export const Small = Template.bind({});
Small.args = {
  id: 'Small',
  notificationType: NotificationType.SMALL,
  isOpen: true,
  title: 'Small Warning',
  subtitle: 'This is a notification',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
};

export const Medium = Template.bind({});
Medium.args = {
  id: 'Medium',
  notificationType: NotificationType.MEDIUM,
  isOpen: true,
  title: 'Medium Warning',
  subtitle: 'This is a notification',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
};

export const Large = Template.bind({});
Large.args = {
  id: 'Large',
  notificationType: NotificationType.LARGE,
  isOpen: true,
  title: 'Large Warning',
  subtitle: 'This is a notification',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
};
