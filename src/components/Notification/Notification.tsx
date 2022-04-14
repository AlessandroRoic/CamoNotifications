import React, { useEffect, useState } from 'react';
import './Notifications.scss';
import ReactDOM from 'react-dom';

export enum NotificationType {
  COOKIE = 'cookie',
  CUSTOM = 'custom',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface NotificationProps {
  id: string;
  type: NotificationType;
  isOpen: boolean;
  onClose: (event: any) => void;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode | string | HTMLElement;
  customStyle?: React.CSSProperties;
}

export enum HarmonyType {
  COMPLIMENTARY,
  SPLIT,
  TRIAD,
  TETRAD,
  ANALOGOUS,
}

export function Notification(props: NotificationProps) {
  const { id, type, title, subtitle, content, customStyle, isOpen, onClose } = props;

  const [notificationStyle, setNotificationStyle] = useState({});

  const parseRGBtoHSL = (rgb: string) => {
    let [r, g, b] = rgb
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(Number);
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    let h = 0;
    if (s) {
      if (l === r) {
        h = (g - b) / s;
      } else {
        h = l === g ? 2 + (b - r) / s : 4 + (r - g) / s;
      }
    }
    const parsedH = 60 * h < 0 ? 60 * h + 360 : 60 * h;
    let parsedS = 0;
    if (s) {
      parsedS = l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s));
    }
    parsedS *= 100;
    const parsedL = (100 * (2 * l - s)) / 2;
    return [parsedH, parsedS, parsedL];
  };

  const getHarmonyConfig = (harmony: HarmonyType) => {
    switch (harmony) {
      case HarmonyType.SPLIT:
        return { start: 150, end: 210, interval: 1 };
      case HarmonyType.TRIAD:
        return { start: 120, end: 240, interval: 120 };
      case HarmonyType.TETRAD:
        return { start: 90, end: 270, interval: 90 };
      case HarmonyType.ANALOGOUS:
        return { start: 30, end: 90, interval: 30 };
      case HarmonyType.COMPLIMENTARY:
      default:
        return { start: 180, end: 180, interval: 1 };
    }
  };

  const getColorHarmony = (rgba: string, harmony: HarmonyType = HarmonyType.COMPLIMENTARY) => {
    const [h, s, l] = parseRGBtoHSL(rgba);
    const colors = [];
    const { start, end, interval } = getHarmonyConfig(harmony);

    for (let i = start; i <= end; i += interval) {
      const harmonizedH = (h + i) % 255;
      const c1 = `hsl(${harmonizedH}, ${s}%, ${l}%)`;
      colors.push(c1);
    }
    return colors;
  };

  useEffect(() => {
    const { backgroundColor, color } = window.getComputedStyle(document.body);
    const generatedStyle = {
      color,
      backgroundColor: getColorHarmony(backgroundColor)[0],
    };

    setNotificationStyle({
      ...(customStyle || generatedStyle || {}),
      zIndex: customStyle?.zIndex || 9999,
    });
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={`notification-wrapper--${type}`} id={id} style={notificationStyle}>
      <div className={`notification__${type}`}>
        <div className="notification__button-wrapper">
          <button type="button" onClick={onClose} className="notification__close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
        {title && <h2>{title}</h2>}
        {subtitle && <h3>{subtitle}</h3>}
        {content && <span>{content}</span>}
      </div>
    </div>,
    document.body,
  );
}

Notification.defaultProps = {
  title: undefined,
  subtitle: undefined,
  content: undefined,
  customStyle: undefined,
};

export function useCamoNotification() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggle,
  };
}
