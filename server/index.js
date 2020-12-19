require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const app = express();

const {getParkingLotId, getAllBasicRouteInfo} = require("./Controllers/main");

const port = process.env.SERVER_PORT || 8081;

app.use(json());
app.use(cors());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000
      }
    })
  );

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

  process.on('uncaughtException', function (err) {
    console.log(err);
});

// app.get(`/api/routes`, getAllRoutes);
app.get(`/api/routes`, getAllBasicRouteInfo);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`))

app.listen(port, () => {
    console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
  });