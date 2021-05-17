// Set up the dependencies (these are the modules required to create and run the app)
// https://expressjs.com/en/starter/hello-world.html
const express = require("express");


// https://nodejs.dev/learn/the-nodejs-fs-module
//The fs module enables interacting with the file system
const fs = require("fs");


//https://nodejs.org/api/path.html
//The path module provides utilities for working with file and directory paths. 
const path = require("path");
// const database = require("./db/db.json");

//Set up Express for port listening
// https://expressjs.com/en/starter/basic-routing.html
//https://expressjs.com/en/guide/routing.html
let app = express();
let PORT = process.env.PORT || 3000;

