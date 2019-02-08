require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const commands = process.argv[2];

//  = process.argv[3];