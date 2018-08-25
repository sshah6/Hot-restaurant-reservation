// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Table Information (DATA)
// =============================================================
var reservations = [
    {
        name: "test name",
        phone: "555-555-5555",
        email: "test email",
        id: 101
    }
];

var waitlist = [
    {
        name: "test name",
        phone: "555-555-5555",
        email: "test email",
        id: 102
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

// Add reservation
app.post("/add", function (req, res) {
    // Store post body as new table object
    var newTable = req.body;
    // Create empty response object
    var response = {};

    if (reservations.length <= 5) {
        reservations.push(newTable);
        response.type = "reservation";
        response.data = reservations;
    }
    else {
        waitlist.push(newTable);
        response.type = "waitlist";
        response.data = waitlist;
    }
    // Send resonse object
    res.json(response);
});

// View reservations
app.get("/view/reservations", function (req, res) {
    res.json(reservations);
});

// View waitlist
app.get("/view/waitlist", function (req, res) {
    res.json(waitlist);
});

// Clear all reservations and waitlist
app.get("/clear", function (req, res) {
    reservations = [];
    waitlist = [];
    res.send("success");
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
