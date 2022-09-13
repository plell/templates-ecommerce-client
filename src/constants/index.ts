const origin = window.location.origin;

const SERVER_URL = "https://davidplell.com/"

export const isDevelopment =
  origin === "http://localhost:3000" ||
  origin === "http://localhost:3001"
    ? true
    : false;
  
export const API_URL = isDevelopment ? "http://localhost:8000/" : SERVER_URL;




