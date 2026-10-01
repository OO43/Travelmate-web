import type {
  AccessibilitySettings,
  Journey,
  JourneyAlert,
  PassengerProfile,
  RouteOption,
} from '../types/travel';

export const routeOptions: RouteOption[] = [
  {
    id: 'route-24',
    routeNumber: '24',
    departureTime: '14:35',
    arrivalTime: '14:53',
    durationMinutes: 18,
    changes: 0,
    origin: 'Leicester Station',
    destination: 'Haymarket',
    price: '£2.00',
    features: ['Step-free', 'Low-floor bus', 'Assistance available'],
    recommended: true,
  },
  {
    id: 'route-48',
    routeNumber: '48',
    departureTime: '14:42',
    arrivalTime: '15:07',
    durationMinutes: 25,
    changes: 1,
    origin: 'Charles Street',
    destination: 'Haymarket',
    price: '£2.00',
    features: ['Step-free', 'More walking'],
  },
];

export const initialJourneys: Journey[] = [
  {
    id: 'journey-1',
    origin: 'Leicester Station',
    destination: 'Haymarket',
    dateLabel: 'Today',
    departureTime: '14:35',
    arrivalTime: '14:53',
    routeNumber: '24',
    durationMinutes: 18,
    status: 'planned',
    support: ['Step-free', 'Haptic alerts'],
  },
  {
    id: 'journey-2',
    origin: 'Home',
    destination: 'Leicester Royal Infirmary',
    dateLabel: 'Tuesday',
    departureTime: '09:10',
    arrivalTime: '09:42',
    routeNumber: '48',
    durationMinutes: 32,
    status: 'planned',
    support: ['Assistance requested'],
  },
];

export const initialAlerts: JourneyAlert[] = [
  {
    id: 'alert-delay',
    category: 'journey',
    type: 'Service update',
    title: 'Bus 24 is running 4 minutes late',
    message: 'Your planned departure is now 14:39. Your stop reminder has been adjusted automatically.',
    timeLabel: '12 min ago',
    unread: true,
    tone: 'amber',
  },
  {
    id: 'alert-assistance',
    category: 'journey',
    type: 'Assistance confirmed',
    title: 'Boarding support is ready',
    message: 'Transport staff have received your request for the 14:35 service from Leicester Station.',
    timeLabel: '36 min ago',
    unread: true,
    tone: 'blue',
  },
  {
    id: 'alert-preferences',
    category: 'general',
    type: 'Preferences',
    title: 'Your accessibility preferences were updated',
    message: 'Step-free routes, haptic guidance and extra transfer time are now enabled.',
    timeLabel: 'Yesterday',
    unread: false,
    tone: 'mint',
  },
  {
    id: 'alert-feedback',
    category: 'general',
    type: 'Travelmate',
    title: 'How was your journey?',
    message: 'Your feedback helps improve future assistance and route suggestions.',
    timeLabel: '18 September',
    unread: false,
    tone: 'lilac',
  },
];

export const defaultAccessibilitySettings: AccessibilitySettings = {
  haptics: true,
  largeText: false,
  highContrast: false,
  audio: false,
  stepFree: true,
  boarding: true,
  extraTime: true,
  seating: false,
  personalisation: true,
};

export const initialProfile: PassengerProfile = {
  firstName: 'Ooreoluwa',
  lastName: 'Oluwabiyi',
  email: 'oore@example.com',
  phone: '+44 7700 900123',
  preferredLanguage: 'English',
  emergencyContact: 'Not added',
};
