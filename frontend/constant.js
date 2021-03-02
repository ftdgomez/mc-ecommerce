export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sass.refrigeracionmc.com/api/'
    : 'http://localhost:2212/api/';
