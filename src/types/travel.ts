export type AppView = 'home' | 'journeys' | 'accessibility' | 'alerts' | 'profile';

export type ModalName = 'planner' | 'assistance' | 'feedback' | 'preferences' | 'contact' | null;

export interface RouteOption {
  id: string;
  routeNumber: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  changes: number;
  origin: string;
  destination: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Journey {
  id: string;
  origin: string;
  destination: string;
  dateLabel: string;
  departureTime: string;
  arrivalTime: string;
  routeNumber: string;
  durationMinutes: number;
  status: 'planned' | 'active' | 'completed';
  support: string[];
}

export interface JourneyAlert {
  id: string;
  category: 'journey' | 'general';
  type: string;
  title: string;
  message: string;
  timeLabel: string;
  unread: boolean;
  tone: 'amber' | 'blue' | 'mint' | 'lilac';
}

export interface AccessibilitySettings {
  haptics: boolean;
  largeText: boolean;
  highContrast: boolean;
  audio: boolean;
  stepFree: boolean;
  boarding: boolean;
  extraTime: boolean;
  seating: boolean;
  personalisation: boolean;
}

export interface PassengerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  emergencyContact: string;
}

export interface ToastMessage {
  title: string;
  message: string;
}
