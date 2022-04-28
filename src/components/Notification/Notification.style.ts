// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { NotificationType, Position } from './Notification.types';

const blackShadow = '#333';

export const getWidth = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.COOKIE:
      return '80vw';
    case NotificationType.SMALL:
      return '20vw';
    case NotificationType.MEDIUM:
      return '40vw';
    case NotificationType.LARGE:
    default:
      return '60vw';
  }
};

export const getPosition = (position: Position): any => {
  switch (position) {
    case Position.CENTER:
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      };
    case Position.CENTER_LEFT:
      return {
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
      };
    case Position.CENTER_RIGHT:
      return {
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
      };
    case Position.TOP_CENTER:
      return {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case Position.TOP_LEFT:
      return {
        top: 0,
        left: 0,
      };
    case Position.TOP_RIGHT:
      return {
        top: 0,
        right: 0,
      };
    case Position.BOTTOM_CENTER:
      return {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case Position.BOTTOM_LEFT:
      return {
        bottom: 0,
        left: 0,
      };
    case Position.BOTTOM_RIGHT:
    default:
      return {
        bottom: 0,
        right: 0,
      };
  }
};

export const NotificationWrapper = styled.div((props: { position: Position }) => ({
  display: 'grid',
  position: 'absolute',
  ...getPosition(props.position),
}));

export const StyledNotification = styled.div((props: { notificationType: NotificationType }) => ({
  borderRadius: '10px',
  boxShadow: `0 0 10px ${blackShadow}`,
  padding: '20px',
  width: getWidth(props.notificationType),
}));

export const CloseButtonWrapper = styled.div`
  text-align: right;

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  svg {
    height: 12px;
    width: 12px;
  }
`;
