/**
 * The Kalks Client Area (CRM) owns sign-in and registration. Every "Log in",
 * "Sign up" and "Open account" on the website points there; the website has
 * no accounts of its own.
 */
export const CRM_URL = (process.env.NEXT_PUBLIC_CRM_URL || 'http://localhost:3000').replace(/\/$/, '');
export const CRM_LOGIN = `${CRM_URL}/login`;
export const CRM_REGISTER = `${CRM_URL}/register`;
