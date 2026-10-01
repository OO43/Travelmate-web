import type { PassengerProfile, RouteOption } from '../types/travel';
import { routeOptions } from '../data/demo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Travelmate API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const travelmateApi = {
  async planJourney(origin: string, destination: string): Promise<RouteOption[]> {
    // Demo fallback. Replace this return statement with the request below when FastAPI is connected.
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return routeOptions.map((route) => ({ ...route, origin, destination }));

    // return request<RouteOption[]>('/journeys/plan', {
    //   method: 'POST',
    //   body: JSON.stringify({ origin, destination }),
    // });
  },

  updateProfile(profile: PassengerProfile) {
    return request<PassengerProfile>('/passenger/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },
};
