import React, { useState } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Notification from './Notification';
import { HarmonyType, NotificationProps, NotificationType, Position } from './Notification.types';
import { getPosition, getWidth } from './Notification.style';

const defaultProps: NotificationProps = { id: 'test', isOpen: true, onClose: () => {}, notificationType: NotificationType.MEDIUM };
const customRender = (props: NotificationProps = defaultProps) => render(<Notification {...props} />);

function TestWrapper(props: { initialState: any } = { initialState: true }) {
  const { initialState } = props;
  const [isOpen, setIsOpen] = useState(initialState);
  return <Notification id="test" isOpen={isOpen} onClose={() => setIsOpen(false)} notificationType={NotificationType.MEDIUM} />;
}

describe('notification component', () => {
  beforeEach(cleanup);

  it('should render correctly', () => {
    const component = customRender({ ...defaultProps, title: 'test', subtitle: 'test', content: 'test' });
    expect(document.getElementById('test')).toBeTruthy();
    expect(component.baseElement).toMatchSnapshot();
  });

  it('should close correctly with button', () => {
    const component = render(<TestWrapper initialState />);
    fireEvent.click(component.getByRole('button'));
    expect(document.getElementById('test')).toBeNull();
    expect(component.baseElement).toMatchSnapshot();
  });

  it.each(Object.values(NotificationType))('should render notification type correctly', (notificationType: NotificationType) => {
    const component = customRender({ ...defaultProps, notificationType });
    const wrapper = document.getElementById('test')?.firstChild;
    const generatedWidthByType = { width: getWidth(notificationType) };
    expect(wrapper).toHaveStyle(generatedWidthByType);
    expect(component.baseElement).toMatchSnapshot();
  });

  it.each(Object.values(Position))('should render position correctly', (position: Position) => {
    const component = customRender({ ...defaultProps, position });
    const wrapper = document.getElementById('test');
    const generatedPosition = getPosition(position);
    expect(wrapper).toHaveStyle(generatedPosition);
    expect(component.baseElement).toMatchSnapshot();
  });

  it.each(Object.values(HarmonyType))('should render harmony correctly', (harmonyType: HarmonyType) => {
    const component = customRender({ ...defaultProps, harmonyType });
    expect(component.baseElement).toMatchSnapshot();
  });

  it('should render no harmony', () => {
    const component = customRender({ ...defaultProps, harmonyType: undefined });
    expect(component.baseElement).toMatchSnapshot();
  });

  it('should render a white background notification', () => {
    document.body.style.background = 'rgb(0,0,0)';
    const component = customRender();
    expect(component.baseElement).toMatchSnapshot();
  });
});
