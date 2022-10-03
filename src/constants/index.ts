// customer variables
const VENDOR_ID = process.env.REACT_APP_VENDOR_ID + "/"
const SERVER_URL = process.env.REACT_APP_LAUNCHED_BY_STACK ? ("http://api/" + VENDOR_ID) : ("https://api.plellworks.com/" + VENDOR_ID)

// const SERVER_URL = process.env.REACT_APP_LAUNCHED_BY_STACK ? "http://api/": "https://api.plellworks.com/" 

export const DAYS_BEFORE_PICKUP = 2
// core variables
const origin = window.location.origin;

export const isDevelopment =
  origin === "http://localhost:3000" ||
  origin === "http://localhost:3001"
    ? true
    : false;
  
export const API_URL = isDevelopment ? "http://localhost:8000/divvy/" : SERVER_URL;






