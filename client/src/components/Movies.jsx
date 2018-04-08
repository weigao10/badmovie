import React from 'react';
import axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.displayMovies = this.displayMovies.bind(this)
    this.displayFaves = this.displayFaves.bind(this)

    this.saveToFaves = this.saveToFaves.bind(this)
  }

  componentDidMount(){
    this.props.getMovies()
  }

//    Make an onclick for each list item. If the movies shown is the search results, 
//.   add it to the db (do it in the main app, and passs down the function). 

//.   If youre currently showing the fave list, delete the movie instead
//.   you can tell which list it is based on whether the prop "showFaves" is false (search results) or true (fave list)


  displayMovies() {
    return (
      <ul className="movies">
      {
        this.props.movies.map((movie) => { 
          let date = (movie.release_date) ? movie.release_date.slice(0, 4) : 'none'
          return <li className="movie_item" onClick={() =>{
            this.saveToFaves(movie);
          }}><div>
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} width="209"/>
            <div className="movie_description">
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.vote_average}</span>
                </div>
              </section>
            </div>
          </div></li>
        })
      }
    </ul>)
  }

  displayFaves() {
    return <div>WILL SHOW FAVES</div> 
  }

  saveToFaves(movie){
    console.log('in', movie)
    axios.post('/save', {
      movie: movie
    })
  }

  render() {
    if(this.props.showFaves){
      return this.displayFaves()
    } else {
      return this.displayMovies()
    }
  }
}

export default Movies