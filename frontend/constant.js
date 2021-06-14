export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://sass.refrigeracionmc.com/api/'
    : 'http://localhost:2222/api/';

// export const API_URL = 'https://sass.refrigeracionmc.com/api/'; 

export const USER_COOKIE = 'mc_user_info'
export const CART_COOKIE = 'mc_cart_info'
