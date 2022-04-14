import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Notification, NotificationProps, NotificationType } from '../components/Notification';

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
  subtitle: 'Accept Cookies',
  content: 'Click here to accept cookies:',
};
