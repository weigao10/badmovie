//database
const mysql = require('mysql');
const mysqlConfig = require('./config.js').config;
// console.log('config', mysqlConfig)

const connection = mysql.createConnection(mysqlConfig);
connection.connect()

const getAllFavorites = function(callback) {
  //get favorites from the database
};
const saveFavorite = function(data, callback) {
  console.log('db', data)
  let url = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  let year = (data.release_date) ? data.release_date.slice(0, 4) : 'none'
  connection.query('INSERT INTO ratings (imageUrl, title, year, rating) VALUES (?,?,?,?)', 
                  [url, data.title, year, data.vote_average] )
  // cb('hi');
};
const deleteFavorites = function(callback) {
  //get favorites from the database
};
module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};