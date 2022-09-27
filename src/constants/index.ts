

// customer variables
const SERVER_URL = "https://api.davidplell.com/"
export const DAYS_BEFORE_PICKUP = 2
// core variables
const origin = window.location.origin;

export const isDevelopment =
  origin === "http://localhost:3000" ||
  origin === "http://localhost:3001"
    ? true
    : false;
  
export const API_URL = isDevelopment ? "http://localhost:8000/" : SERVER_URL;






