/// These routes do not required authentication
export const publicRoutes = [
    "/",
    "/auth/new-verification"
];

/////******* An array of routes that are used for authentication *********** */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/****
 * The prefix for api authentication routes 
 * Routes that start with this prefix are used for API authenticaion purposes
 * 
 * 
 * **/

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings"