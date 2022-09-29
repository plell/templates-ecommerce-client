// customer variables
const SERVER_URL = process.env.REACT_APP_LAUNCHED_BY_STACK ? "http://api/" : "https://api.plellworks.com/"

export const DAYS_BEFORE_PICKUP = 2
// core variables
const origin = window.location.origin;

export const isDevelopment =
  origin === "http://localhost:3000" ||
  origin === "http://localhost:3001"
    ? true
    : false;
  
export const API_URL = isDevelopment ? "http://localhost:8000/" : SERVER_URL;






