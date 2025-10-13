// src/utils/tokenStorage.ts
const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const PROFILE_KEY = "myProfile";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const saveProfile = (profile: any) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getProfile = () => {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

export const clearProfile = () => {
  localStorage.removeItem(PROFILE_KEY);
};
