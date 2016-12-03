export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
// export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const API_BASE_URL: string = `http://${'localhost'}:${3010}/api`;

export const JWT_KEY: string = 'projectify_token';
