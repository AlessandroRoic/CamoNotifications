import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HarmonyConfig, HarmonyType, NotificationProps, Position } from './Notification.types';
import { CloseButtonWrapper, NotificationWrapper, StyledNotification } from './Notification.style';

export default function Notification(props: NotificationProps): React.ReactElement | null {
  const { id, notificationType, position, harmonyType, title, subtitle, content, customStyle, isOpen, onClose } = props;

  const [notificationStyle, setNotificationStyle]: [React.CSSProperties, (value: React.CSSProperties) => void] = useState({});

  const parseRGBToArray = (rgb: string): number[] =>
    rgb
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(Number);

  /**
   * Converts an RGB color value to HSL. Conversion formula
   * adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns HLS with H: [0, 360], S: [0, 100], L: [0, 100]
   *
   * @param   rgb The rgb string from the style
   * @return  The HSL representation
   */
  const parseRGBtoHSL = (rgb: string): number[] => {
    let [r, g, b] = parseRGBToArray(rgb);
    r /= 255;
    g /= 255;
    b /= 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let [h, s, l] = [0, 0, 0];
    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    h = h < 0 ? (h += 360) : h;
    l = (max + min) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
  };

  const getHarmonyConfig = (harmony?: HarmonyType): HarmonyConfig => {
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

  /**
   * Formula adapted from https://en.wikipedia.org/wiki/Relative_luminance
   * @input selected color expressed in RBG
   * @return relative luminance of an RGB color
   */
  const luminance = (r: number, g: number, b: number): number => {
    const mappedRgb = [r, g, b].map((color: number) => {
      const parsedColor = color / 255;
      return parsedColor <= 0.03928 ? parsedColor / 12.92 : ((parsedColor + 0.055) / 1.055) ** 2.4;
    });
    return mappedRgb[0] * 0.2126 + mappedRgb[1] * 0.7152 + mappedRgb[2] * 0.0722;
  };

  /** Calculates the contrast between two colors
   * @input colors to check
   * @return contrast between two colors
   */
  const contrast = (rgb1: number[], rgb2: number[]): number => {
    const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const getColorHarmony = (rgba: string, harmony?: HarmonyType): string[] => {
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

  const white = [255, 255, 255];

  const getFontColor = (backgroundColor: any): string => {
    const backgroundContrast = contrast(parseRGBToArray(backgroundColor), white);
    return backgroundContrast >= 4.5 ? 'rgb(255,255,255)' : 'rgb(0,0,0)';
  };

  useEffect(() => {
    const { backgroundColor } = window.getComputedStyle(document.body);
    const generatedStyle = {
      color: getFontColor(backgroundColor),
      backgroundColor: getColorHarmony(backgroundColor, harmonyType)[0],
    };

    setNotificationStyle({
      ...generatedStyle,
      ...(customStyle || {}),
      zIndex: customStyle?.zIndex || 9999,
    });
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <NotificationWrapper position={position} id={id}>
      <StyledNotification notificationType={notificationType} style={notificationStyle}>
        <CloseButtonWrapper>
          <button type="button" onClick={onClose} style={{ fill: notificationStyle.color }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </CloseButtonWrapper>
        {title && <h2>{title}</h2>}
        {subtitle && <h3>{subtitle}</h3>}
        {content && <span>{content}</span>}
      </StyledNotification>
    </NotificationWrapper>,
    document.body,
  );
}

Notification.defaultProps = {
  title: undefined,
  subtitle: undefined,
  content: undefined,
  customStyle: undefined,
  position: Position.CENTER,
  harmonyType: HarmonyType.COMPLIMENTARY,
};
