// At the top of the liri.js file, this adds code to read and sets any environment variables with the dotenv package:
require("dotenv").config();

// This grabs the fs package to handle read/write:
const fs = require("fs");

// This adds the code required to import the keys.js file and stores it in a variable:
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

// This enables access to the keys information:
const spotify = new Spotify(keys.spotify);

// This 
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

var doItTracker = false;

// This grabs the axios package:
const axios = require("axios");

// This grabs the moment package:
const moment = require("moment");

// This function emcompasses all four actions:
function actions() {
    console.log(action);
    console.log(value);

    // The switch-case will direct which function gets run:
    switch (action) {
        case "concert-this":
            concert(value);
            break;

        case "spotify-this-song":
            spotifyThis(value);
            break;

        case "movie-this":
            movie(value);
            break;

        case "do-what-it-says":
            if (!doItTracker)
                doIt();
            break;
    }
}
actions();

// If the "concert-this" action is called:
function concert(artist) {

    // This runs a request with axios to the bandsintown.com API with the artist specified:
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            response.data.forEach(function (event) {
                console.log("==========================================================================");
                console.log("Venue: " + event.venue.name);
                console.log("City: " + event.venue.city);
                console.log("Date: " + moment(event.datetime).format("MM/DD/YYYY"));
            }
            )
        }
    )
};

// If the "spotify-this-song" action is called:
function spotifyThis(song) {

    if (song.trim().length === 0) {
        spotify.request("https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc")
            .then(function (response) {

                console.log("==========================================================================");
                console.log("Artist: " + response.album.artists[0].name);
                console.log("Song: " + "'" + response.name + "'");
                console.log("Preview URL: " + response.preview_url);
                console.log("Album: " + response.album.name);
                console.log("==========================================================================");
            })
            .catch(function (err) {
                console.error("Error occurred: " + err);
            });

    } else {

        spotify.search({ type: "track", query: song, limit: 1 })
            .then(function (response) {

                console.log("==========================================================================");
                console.log("Artist: " + response.tracks.items[0].artists[0].name)
                console.log("Song: " + "'" + response.tracks.items[0].name + "'")
                console.log("Preview URL: " + response.tracks.items[0].preview_url)
                console.log("Album: " + response.tracks.items[0].album.name)
                console.log("==========================================================================");
            })
    }
};

// If the "movie-this" action is called:
function movie(movieName) {

    if (movieName.trim().length === 0) {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                console.log("==========================================================================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("==========================================================================");
            });
    } else {

        axios.get("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("==========================================================================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("==========================================================================");
            }
        )
    }
};

// If the "do-what-it-says" action is called:
function doIt() {
    // It will read the existing random.txt file:
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(", ");

        action = dataArr[0];
        value = dataArr[1];

        doItTracker = true;
        actions();

    });
}