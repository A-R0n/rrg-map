require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const app = express();

const {getParkingLotId, getAllBasicRouteInfo} = require("./Controllers/main");

const port = process.env.SERVER_PORT || 8081;

app.use(json());
app.use(cors());

const config = {
  connectionString: process.env.CONNECTION_STRING,
  // i am opting out of MITM protection by setting this to false
  ssl: {
    rejectUnauthorized: false
  }
};


massive(config)
  .then(dbInstance => {
    // console.log("read this dbInstance:", dbInstance);
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.get(`/api/routes`, getAllBasicRouteInfo);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`));

app.listen(port, () => {
    console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
  });