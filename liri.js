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

function getSpotify(song) {

  if (song === undefined) {
     song = "The Sign"
  }; 
  
  spotify.search({
      type: "track", 
      query: song
  }, function (error, data) {
   if (error) {
      return console.log ("Error!" + error); 
   }  

   var spotifyArray = data.tracks.items; 

   for (i = 0; i < spotifyArray.length; i++) {

    console.log(divider);
    console.log("Artist: " + data.tracks.items[i].artists[0].name); 
    console.log("Song: " + data.tracks.items[i].name); 
    console.log("Album: " + data.tracks.items[i].album.name); 
    console.log("Preview Link: " + data.tracks.items[i].preview_url); 
   }


  }); 
  
}

function getRandom() {
    fs.readFile("./random.txt", "utf8", (error, data) => {
        if (err) throw err; 
        var file = data.split(","); 
        console.log(fileContent[0] + " " + fileContent[1]); 
        userSearch = fileContent[1]
        switch (fileContent[0]) {
            case "concert-this": 
            getConcert();   
            break; 
            case "movie-this": 
            getMovie(); 
            break; 
            case "spotify-this-song": 
            getSpotify(); 
            break; 
            case "do-what-it-says": 
            getRandom(); 
            break; 
            default: 
            console.log("Try again"); 
        }
    }); 
}