/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
require("dotenv").config();

module.exports = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      return {
        // environment varibales for local development
        env: {
          IDP_DOMAIN: "https://team20-truckdrivers.auth.us-east-1.amazoncognito.com",
          USER_POOL_ID: "us-east-1_uXeFvCqps",
          USER_POOL_CLIENT_ID: "39tpk87ra9174ka9vv6trla406",
          REDIRECT_SIGN_IN: "http://localhost:3000/token",
          REDIRECT_SIGN_OUT: "http://localhost:3000/",
          AUTH_COOKIE_DOMAIN: "localhost",
          DATABASE_URL: process.env.DATABASE_URL,
          DATABASE_USER: process.env.DATABASE_USER,
          DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
          DATABASE_PORT: process.env.DATABASE_PORT,
          DATABASE_NAME: process.env.DATABASE_NAME,
          APP_URL: "http://localhost:3000",
        },
      };
    default:
      return {
        // environment varibales for production
        env: {
          IDP_DOMAIN: "https://team20-truckdrivers.auth.us-east-1.amazoncognito.com",
          USER_POOL_ID: "us-east-1_uXeFvCqps",
          USER_POOL_CLIENT_ID: "39tpk87ra9174ka9vv6trla406", 
          REDIRECT_SIGN_IN: process.env.APP_URL + "/token",
          REDIRECT_SIGN_OUT: process.env.APP_URL,
          AUTH_COOKIE_DOMAIN: "main.d12gpukybqal69.amplifyapp.com",
          DATABASE_URL: process.env.DATABASE_URL,
          DATABASE_USER: process.env.DATABASE_USER,
          DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
          DATABASE_PORT: process.env.DATABASE_PORT,
          DATABASE_NAME: process.env.DATABASE_NAME,
          APP_URL: process.env.APP_URL,
        },
      };
  }
};
