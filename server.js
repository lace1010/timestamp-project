// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// This get takes a timestamp with an empty parameter and returns the current time
app.get("/api/timestamp", function (req, res) {
  // Make sure variables are inside the function so the update everytime website is refreshed.
  let currentTime = Date().toString();
  let currentUnixTime = Date.now();
  res.json({ unix: currentUnixTime, utc: currentTime });
});

function fomatUTCDate(date) {}

// This receives anything that is put into date parameter. In function we say if it is valid or not.
app.get("/api/timestamp/:date", function (req, res) {
  // :date is just the parameter that we pass into it.
  let date_string = req.params.date; // This is what the date parameter passed into the site is

  // We need to take the dateString and break it up into an array using .split() to create a js Date with its' values
  let dateInArray = date_string.split("-");
  console.log(dateInArray[0]);
  console.log(dateInArray[1]);
  console.log(dateInArray[2]);

  // Create a js date with the date that is passed in
  let date = new Date(dateInArray[0], dateInArray[1] - 1, dateInArray[2]);

  res.json({
    unix: date.valueOf(),
    utc: date.toDateString() + " " + date.toTimeString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
