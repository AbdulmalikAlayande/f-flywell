export const SERVER_BASE_URL = "http://localhost:8081/";

export const CONFIG = {
    development: {
        SERVER_BASE_URL: 'http://localhost:8081/',
        TOKEN_ENCRYPTION_KEY: 'dev_secret'
    },
    production: {
        SERVER_BASE_URL: 'https://server.flywell.tech',
        HEROKU_SERVER_BASE_URL: 'https://vast-reaches-41651-50eb7a686ef3.herokuapp.com/' ,
        TOKEN_ENCRYPTION_KEY: import.meta.env.VITE_TOKEN_SECRET
    }
};
