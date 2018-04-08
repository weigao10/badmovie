//server
var express = require('express');
var axios = require('axios')
var bodyParser = require('body-parser');
var request = require('request')
var config = require(__dirname + '/config.js')
var db = require(__dirname + '/database.js')
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/search', function (req, res) {
    let moviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' 
                    + config.API_KEY 
                    + '&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_genres='
                    + req.body.genre;
    axios.get(moviesUrl)
    .then((response) => {
        res.end(JSON.stringify(response.data.results))
    })
    .catch((err) => {
        console.log('err in API get req /search', err)
    })
})

app.get('/faves', (req, res) => {
    db.getAllFavorites((response) => {
        res.end(JSON.stringify(response))
    })
})

app.get('/genres', function (req, res) {
    let genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + config.API_KEY
    axios.get(genreUrl)
        .then((response) => {
            res.end(JSON.stringify(response.data.genres))
        })
        .catch((err) => {
            console.log('err in API get req /genres', err)
        })
})

app.post('/save', function (req, res) {
    db.saveFavorite(req.body.movie)
})

app.post('/delete', function (req, res) {
    db.deleteFavorite(req.body.movie)
    res.end()
})
app.listen(3000, function () {
    console.log('listening on port 3000!');
});