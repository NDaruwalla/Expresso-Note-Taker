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
const PORT = process.env.PORT || 9026;

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

//Use app.post to write the new item to the json file; The app.post() function routes the HTTP POST requests to the specified path with the specified callback functions.
app.post("/api/notes", function(req, res) {
  try {
    //Read the file
    itemInput = fs.readFileSync("./db/db.json", "utf8");
    console.log(itemInput);

    //Use JSON.parse to revert to an array
    itemInput = JSON.parse(itemInput);

    //Create a new id for each item/note using req.body.id
    //https://www.geeksforgeeks.org/express-js-req-body-property/
    req.body.id = itemInput.length;

    //Use .push to add the new item to the array
    itemInput.push(req.body); 

    //Convert the value to a JSON string using JSON.stringify to write it to the file
    itemInput = JSON.stringify(itemInput);

    /// Use fs.writeFile to write the new item/note to the file
    fs.writeFile("./db/db.json", itemInput, "utf8", function(err) {

    // Handle any errors
      if (err) throw err;
    });
    
    // Use JSON.parse for itemInput to revert back the array of objects before it is sent to the browser
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    res.json(JSON.parse(itemInput));

//Handle any errors
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Delete the item/note (assignment bonus)
//https://www.geeksforgeeks.org/express-js-app-delete-function/
app.delete("/api/notes/:id", function(req, res) {
  try {
    
    itemInput = fs.readFileSync("./db/db.json", "utf8");
   
    itemInput = JSON.parse(itemInput);
  
    itemInput = itemInput.filter(function(note) {
      return note.id != req.params.id;
    });

    // convert the JavaScript value to a JSON string using JSON.stringify to write it to the file
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    itemInput = JSON.stringify(itemInput);

    // Use fs.writeFile to write the new item/note to the file
    //The fs.writeFile() method is used to asynchronously write the specified data to a file
    //https://www.geeksforgeeks.org/node-js-fs-writefile-method/
    fs.writeFile("./db/db.json", itemInput, "utf8", function(err) {

      // Handle any errors
      if (err) throw err;
    });

    // Use JSON.parse to revert back the array of objects before it is sent to the browser
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    res.send(JSON.parse(itemInput));

    // Handle any errors
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// Create the HTML GET requests using routing
// https://expressjs.com/en/guide/routing.html (Routing refers to how an application’s endpoints (URIs) respond to client requests. You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests.)
//app.get is used to return the html web page when the Get noting! button in the app is clicked
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Default to index.html if no matching route can be found
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "./db/db.json"));
});


// Use app.listen() function to bind and listen for the connections on the specified host and port.
// https://www.geeksforgeeks.org/express-js-app-listen-function/
app.listen(PORT, function() {
  console.log("The server is now listening. Enter the localhost port in browser or click the following link: http://localhost:" + PORT);
});