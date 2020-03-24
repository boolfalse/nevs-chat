
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.PORT;

app.listen(port, function () {
    console.log("Server started on port " + port + " !!!");
});
