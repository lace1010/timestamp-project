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

// This takes a timestamp with an empty parameter and returns the current time since no date is there
app.get("/api/timestamp", function (req, res) {
  // Make sure variables are inside the function so the update everytime website is refreshed.
  let currentTime = Date().toString();
  let currentUnixTime = Date.now();
  res.json({ unix: currentUnixTime, utc: currentTime });
});

// This receives anything that is put into date parameter. In function we say if it is valid or not.
app.get("/api/timestamp/:date", function (req, res) {
  // :date is just the parameter that we pass into it.
  let date_string = req.params.date; // This is what the date parameter passed into the site is
  let date;

  // Create a js date if it is passed in year-month-day format
  if (date_string.includes("-")) {
    date = new Date(date_string);
  }
  // Create a js date if it is passed in unix format
  else {
    let millisecondDate_string = parseInt(date_string); // First convert data_string to milliseconds (needs to be converted into a number as Date() will only accept unix as a number)
    date = new Date(millisecondDate_string); // Set the date in variable
  }

  // Handles if date input is invalid
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  // Handles if date is valid
  else {
    res.json({
      unix: date.valueOf(), // Passes the date in a unix timestamp format
      utc: date.toUTCString(), // toUTCString is the format the freeCodeCamp test needs to pass
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
