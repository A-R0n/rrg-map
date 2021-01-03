// include env module which exists in separate file (require)
require("dotenv").config();

// lightweight, flexible web server
const express = require("express");
const app = express();

const { json } = require("body-parser");

// cross-origin resource sharing (Google, Heroku)
const cors = require("cors");

// connect to postgres
const massive = require("massive");

// Controller methods
const {getParkingLotId, getAllBasicRouteInfo} = require("./Controllers/main");

// HTTP Strict Transport Security - for MITM attacks - says browsers can only use https to communicate
const hsts = require('hsts');
// HTTP Feature-Policy ...regarding the use of browser features in it's own frame :=)
const permissionsPolicy = require('permissions-policy');
// Guard me from being used in an iframe
const frameguard = require("frameguard");
// Prevent remote resources from being loaded dangerously
const nosniff = require('dont-sniff-mimetype')
// const csp = require('content-security-policy');
const referrerPolicy = require('referrer-policy');

const dbConfig = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
};

// const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);

app.use(json());
app.use(cors());
app.use(hsts({
  maxAge: 31536000,        // Must be at least 1 year to be approved
  includeSubDomains: true, // Must be enabled to be approved
  preload: true
}));
app.use(permissionsPolicy({
  features: {
    fullscreen: ['self'],
    syncXhr: [],
    geolocation: ['self']
  }
}));
app.use(frameguard({ action: "deny" }));
app.use(nosniff());
app.use(referrerPolicy({ policy: 'same-origin' }));
// app.use(globalCSP);

// Establish db connection
massive(dbConfig)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));


app.get(`/api/routes`, getAllBasicRouteInfo);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`));

const port = process.env.SERVER_PORT || 8081;

app.listen(port, () => {
    console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
  });