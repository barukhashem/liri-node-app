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
            response.data.forEach(function (event) {
                console.log(event.venue.name)
                console.log(event.venue.city)
                // console.log(event.venue.name) MM/DD/YYYY
            }
            )
        }
    )
};

// If the "spotify" function is called...
function spotify() {

    // We will read the existing bank file
    fs.readFile("keys.js", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        spotify
            .search({ type: 'track', query: 'All the Small Things' })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    )
};



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