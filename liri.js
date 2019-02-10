// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// As always, we grab the fs package to handle read/write.
const fs = require("fs");

// Add the code required to import the keys.js file and store it in a variable:
// var keys = require("./keys.js");

// You should then be able to access your keys information like so:
// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

var axios = require("axios");

// The switch-case will direct which function gets run:
switch (action) {
    case "concert":
        concert();
        break;

    case "spotify":
        spotify();
        break;

    case "movie":
        movie();
        break;

    case "command":
        command();
        break;
}

// If the "concert" function is called...
function concert() {

    // Then run a request with axios to the bandsintown.com API with the artist specified:
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site:
            console.log(response);
            // console.log("Venue name: " + response.data.venue.name);
            // console.log("Venue location: " + response.data.venue.city);
            // console.log("Event date: " + response.data.datetime.MM/DD/YYYY);
        },
        function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    )
};

// If the "spotify" function is called...
// function spotify() {
// }

// If the "movie" function is called...
function movie() {
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

// If the "command" function is called...
// function command() {
// }