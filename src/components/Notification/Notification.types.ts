import React, { CSSProperties } from 'react';

export enum NotificationType {
  COOKIE = 'cookie',
  CUSTOM = 'custom',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum Position {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  CENTER = 'center',
  CENTER_LEFT = 'center-left',
  CENTER_RIGHT = 'center-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface NotificationProps {
  id: string;
  notificationType: NotificationType;
  isOpen: boolean;
  onClose: (event: any) => void;
  position?: Position;
  harmonyType?: HarmonyType;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode | string | HTMLElement;
  customStyle?: CSSProperties;
}

export enum HarmonyType {
  COMPLIMENTARY = 'complimentary',
  SPLIT = 'split',
  TRIAD = 'triad',
  TETRAD = 'tetrad',
  ANALOGOUS = 'analogous',
}

export interface HarmonyConfig {
  start: number;
  end: number;
  interval: number;
}
