require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const hsts = require('hsts');
const permissionsPolicy = require('permissions-policy')

// const csp = require('content-security-policy');

const app = express();

const {getParkingLotId, getAllBasicRouteInfo} = require("./Controllers/main");

const port = process.env.SERVER_PORT || 8081;

app.use(json());
app.use(cors());

app.use(permissionsPolicy({
  features: {
    fullscreen: ['self'],               // fullscreen=()
    vibrate: ['none'],                  // vibrate=(none)
    payment: ['self', '"rrgmap.tech"'], // payment=(self "example.com")
    syncXhr: [],                        // syncXhr=()
  }
}));

app.use(hsts({
  maxAge: 31536000,        // Must be at least 1 year to be approved
  includeSubDomains: true, // Must be enabled to be approved
  preload: true
}));

const dbConfig = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
};

massive(dbConfig)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

// const cspPolicy = {
//   'default-src': csp.SRC_NONE,
//   'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
// };
   
// const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
// const localCSP = csp.getCSP(cspPolicy);

// app.use(globalCSP);

// app.get('/', (req, res) => {
//   res.send('Using global content security policy!');
// });
// app.get('/local', localCSP, (req, res) => {
//   res.send('Using path local content security policy!');
// });

app.get(`/api/routes`, getAllBasicRouteInfo);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`));

app.listen(port, () => {
    console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
  });