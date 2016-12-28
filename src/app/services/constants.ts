export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
// export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const API_BASE_URL: string = `http://${'localhost'}:${8080}/api`;
// export const API_BASE_URL: string = `https://projectify-back-eduardomlima.c9users.io/api`;

export const JWT_KEY: string = 'projectify_token';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDFJAjR5OUs3yjvObsj3g945ZZlbRl8d2k';
