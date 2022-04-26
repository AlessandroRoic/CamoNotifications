import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Notification, NotificationProps, NotificationType } from './index';

export default {
  title: 'Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (props: NotificationProps) => {
  return <Notification {...props} />;
};

export const Cookie = Template.bind({});
Cookie.args = {
  id: 'cookie',
  type: NotificationType.COOKIE,
  title: 'Warning',
  isOpen: true,
  onClose: () => {},
  subtitle: 'Accept Cookies',
  content: 'Click here to accept cookies:',
};
