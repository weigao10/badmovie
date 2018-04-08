//database
const mysql = require('mysql');
const mysqlConfig = require('./config.js').config;

const connection = mysql.createConnection(mysqlConfig);
connection.connect()

const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM ratings', (err, data) => {
    if(err){
      console.log('err in getFaves db')
    } else{
      callback(data);
    }
  })
};
const saveFavorite = function(data) {
  connection.query('INSERT INTO ratings (poster_path, title, release_date, vote_average) VALUES (?,?,?,?)', 
                  [data.poster_path, data.title, data.release_date, data.vote_average] )
};
const deleteFavorites = function(callback) {
  //get favorites from the database
};
module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};