CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS ratings (
  id INT NOT NULL AUTO_INCREMENT,
  poster_path VARCHAR(100),
  title VARCHAR(50) NOT NULL,
  release_date VARCHAR(50),
  vote_average INT,
  PRIMARY KEY(id)
);

