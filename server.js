//Dependencies

const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");

let app = express();
let PORT=process.env.PORT || 3000;

