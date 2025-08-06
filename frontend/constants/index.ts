import { SidebarLink } from "@/types";

export const DASHBOARD_ROUTE = "/";
const USERS_ROUTE = DASHBOARD_ROUTE + "/users";

// Sidebar Links
export const sidebarLinks: SidebarLink[] = [
  {
    route: DASHBOARD_ROUTE,
    iconName: "HomeIcon",
    label: "Dashboard",
  },
  {
    route: USERS_ROUTE,
    iconName: "UserIcon",
    label: "Users",
  }
];


// Cookies
export const AUTH_COOKIE_NAME = "auth_user";

// Guest routes and params
export const EMAIL_VERIFIED_PARAM = "verified";

export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/password-reset";
export const VERIFY_EMAIL_ROUTE = "/verify-email";

// Session expired
export const EXPIRED_SESSION_PARAM = "expired_session";
export const EXPIRED_SESSION_ROUTE = `${LOGIN_ROUTE}?${EXPIRED_SESSION_PARAM}`;

export const CASH = 1;
export const BANK_TRANSFER = 2;
export const DEBIT_CARD = 3;
export const CREDIT_CARD = 4;