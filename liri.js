// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// As always, we grab the fs package to handle read/write.
const fs = require("fs");

// Add the code required to import the keys.js file and store it in a variable:
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
// You should then be able to access your keys information like so:
const spotify = new Spotify(keys.spotify);

const action = process.argv[2];
const value = process.argv.slice(3).join(" ");

const axios = require("axios");

const moment = require("moment");

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
        command();
        break;
}

// If the "concert" function is called...
function concert(artist) {

    // Then run a request with axios to the bandsintown.com API with the artist specified:
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            response.data.forEach(function (event) {
                console.log("======================================================================================================");
                console.log("Venue: " + event.venue.name);
                console.log("City: " + event.venue.city);
                console.log("Date: " + moment(event.datetime).format("MM/DD/YYYY"));
                console.log("======================================================================================================");
            }
            )
        }
    )
};

// If the "spotify" function is called...
function spotifyThis(song) {
    spotify.search({ type: "track", query: song, limit: 1 })
        .then(function (response) {
            // console.log(response);
            // console.log(JSON.stringify(response, null, 2));
            console.log("======================================================================================================");
            console.log("======================================================================================================");
            console.log("Artist: " + response.tracks.items[0].artists[0].name)
            console.log("Song: " + "'" + response.tracks.items[0].name + "'")
            console.log("Preview URL: " + response.tracks.items[0].preview_url)
            console.log("Album: " + response.tracks.items[0].album.name)
            console.log("======================================================================================================");
            console.log("======================================================================================================");


            fs.writeFile("spotify-data.json", JSON.stringify(response, null, 2), function (err) {

                // console.log(err);
                // console.log("===================================");
            })
            // .catch(function (err) {
            //     console.log(err);
            // })
        })
};

// If the "movie" function is called...
function movie(movieName) {
    if (movieName === null) {
        queryURL = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
        return console.log(response.data);
    }
    else {

        axios.get("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("======================================================================================================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("======================================================================================================");
            }
        )
    }
};
