
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var movieName = process.argv[3];
var artist = process.argv[2];
var userData = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var input = ""

for (i = 3; i < process.argv.length; i++) {
    if (i > 3) {
        input = input + "+" + process.argv[i];
    } else {
        input = process.argv[i];
    }
}

console.log('user data ', userData)
switch (userData) {
    case "concert-this":
    concertThis(artist);
    break;

    case "spotify-this-song":
    spotifyThisSong(input);
    break;

    case "movie-this":
    movieThis();
    break;

    case"do-what-it-says":
    doWhatItSays(artist);
    break;
    
    default:
    console.log("{Enter a command to start app: spotify-this-song, movie-this, concert-this, or do-what-it-says}");
    break;
}
 
function concertThis(err, artist)  {
    console.log('RUNNING CONCERT THIS ', artist)
    // bandsInTown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    if (err) { 
       // artist.catch(err)
        return console.log('Error occurred: ' + err);
    }   else   {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log('RESPONSE????? ', artist)
   
            //for(var i=0; i > band.data.length; i++)
                console.log("Venue Name ", response.data.venue.name),
                console.log("Venue Location ", response.data.venue.city),
                console.log("Venue Event Date ", moment(response.data.datetime, "YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY"))
            });
        }
    } 
    
function spotifyThisSong(artist)  {
    spotify.search({ type: 'track', query: artist }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }   else   {
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        };
    });
}

function movieThis()    {
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, artist) {
        if (err) {
            return console.log(err);
    }
        artist = input.split(",");
        for (var i = 0; i < artist.length; i++) {
            console.log(spotifyThisSong(artist[i]));
        }
    })
}