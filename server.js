// Set up the dependencies (these are the modules required to create and run the app)
// https://expressjs.com/en/starter/hello-world.html
// Express will interact with the front end
const express = require("express");

// https://nodejs.dev/learn/the-nodejs-fs-module
//The fs module enables interacting with the file system
const fs = require("fs");

//https://nodejs.org/api/path.html
//The path module provides utilities for working with file and directory paths. 
const path = require("path");

//Set up/create Express for port listening
// https://expressjs.com/en/starter/basic-routing.html
//https://expressjs.com/en/guide/routing.html
const app = express();
// Sets an Initial port for listeners
const PORT = process.env.PORT || 9061;

//  Initialize the variable for the itemInput array
let itemInput = [];

// Enable data parsing in express. Express will format the data as JSON. Required for API calls.
// https://medium.com/@gaelciss/node-js-data-parsing-in-express-js-with-different-modules-a4e3b96d1a8c

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

//Route the file:  app.METHOD(PATH, HANDLER) 
//https://expressjs.com/en/starter/basic-routing.html
// https://expressjs.com/en/guide/routing.html
app.get("/api/notes", function(err, res) {
  try {
    
    // Use fs.readFile() method to read the file to buffer to display the notes fs.readFile: ( filename, encoding, callback_function )
    //https://nodejs.org/api/fs.html
    //https://www.geeksforgeeks.org/node-js-fs-readfile-method/
    itemInput = fs.readFileSync("./db/db.json", "utf8");
    console.log("Welcome to the Expresso Note Taker!");
    
    // Use JSON.parse for itemInput to revert back the array of objects before it is sent to the browser
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    itemInput = JSON.parse(itemInput);

    //Handle any errors
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  //Use res.json to send data to the browser; The res.json() function sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
  //https://www.geeksforgeeks.org/express-js-res-json-function/
  res.json(itemInput);
});

