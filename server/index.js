require("dotenv").config();
const path = require('path');
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const hsts = require('hsts');
const permissionsPolicy = require('permissions-policy');
const frameguard = require("frameguard");
const nosniff = require('dont-sniff-mimetype')
const referrerPolicy = require('referrer-policy');

const app = express();

const {getParkingLotId, getAllBasicRouteInfo} = require("./Controllers/main");

const port = process.env.SERVER_PORT || 8081;

app.use(json());
app.use(cors());
app.use(nosniff());

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

app.use(frameguard({ action: "deny" }));

const dbConfig = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
};

app.use(referrerPolicy({ policy: 'same-origin' }));


massive(dbConfig)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.get(`/api/routes`, getAllBasicRouteInfo);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
  });
