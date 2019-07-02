const express = require('express');
const bodyParser = require('body-parser');
var path = require('path')
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// ------------------------------------------------------
// Define Routes: Static
// ------------------------------------------------------
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------
// Require team routes
// ------------------------------------------------------
require('./app/routes/team.routes.js')(app);

// ------------------------------------------------------
// listen for requests
// ------------------------------------------------------
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});