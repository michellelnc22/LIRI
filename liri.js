require("dotenv").config(); 

var keys = require("./keys"); 

var spotify = new spotify(keys.spotify); 

var moment = require("moment"); 

var pick = function(command) {

    switch (command) {
        case "concert-this": 
        getConcert(); 
        break; 
        case "spotify-this-song": 
        getSpotify(); 
        break; 
        case "movie-this": 
        getMovie(); 
        break; 
        case "do-what-it-says": 
        getRandom(); 
        break; 
        default: 
        console.log("I don't recognize that command. Try again"); 
    }
}

var divider = "\n-----------------\n\n"; 

var getMovie = function(movie) {

    if (movie === undefined) {
        movie = "Mr. Nobody"; 
    }

    var URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy"; 
    axios.get(URL).then(function(response) {
        var jsonData = response.data; 

        var movieData = [
            "Title: " + jsonData.Title, 
            "Year: " + jsonData.Year, 
            "IMDB Rating: " + jsonData.Ratings[0], 
            "Rotten Tomatoes Rating: " + jsonData[2], 
            "Country: " + jsonData.Country, 
            "Language: " + jsonData.Language, 
            "Plot: " + jsonData.Plot, 
            "Actors: " + jsonData.Actors
        ].join("\n\n"); 

        fs.appendFile("random.txt", movieData + divider, function(err) {
            if (err) throw err; 
            console.log(movieData);     
        }); 
    });    
}; 

function getConcert(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    axios.get(URL).then(function(response) {
      
        for (i = 0; i < response.data.length; i++) {
            var day = moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'); 
            var jsonData = response.data[i]; 

            var concertData = [
                "Venue Name: " + jsonData.venue.name, 
                "Location: " + jsonData.venue.city + jsonData.venue.region, 
                "Date: " + day
            ].join("\n\n"); 
        }

        fs.appendFile("random.txt", concertData + divider, function(err) {
            if (err) throw err; 
            console.log(concertData); 
        })
        
    })
}