CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS ratings (
  id INT NOT NULL AUTO_INCREMENT,
  imageUrl VARCHAR(100),
  title VARCHAR(50) NOT NULL,
  year INT,
  rating INT,
  PRIMARY KEY(id)
);

