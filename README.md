# LIRI

## LIRI Bot 

This is command line application that uses Node applications to make API requests. Users can search for songs from Spotify, movies from OMDB and upcoming concerts from Bands in Town. Users can search for the artist who sang a song they liked, ratings for upcoming films and where their favorite band is playing. 

## Installing

To run this app, you will need to clone it to your machine. 

HTTPS: 

```
$ git clone https://github.com/michellelnc22/LIRI.git
```

You will also need to add an .env file to the root folder of the APP to hold your Spotify API keys. You can get your API keys here: 

```
https://developer.spotify.com/documentation/web-api/
```

After that you can run the app on your machine. 

## How to Use LIRI

To search for upcoming concert type in the name of your favorite band or musician. 

```
$ node liri.concert-this <insert-band-name-here>
```

Example: 

![Concert Example]
(/screenshots/concert-demo.png)

To look up information about a movie type: 

```
$ node liri.js movie-this <insert movie name>
```
Example: 
![Movie Example]
(https://michellelnc22.github.com/LIRI/screenshots/omdb-demo.png)

To find information about a certain song, type: 

```
$ node liri.js spotify-this-song <insert song title>
```
Example: 
![Spotify Demo]
(https://michellelnc22.github.com/LIRI/screenshots/spotify-demo.png)
