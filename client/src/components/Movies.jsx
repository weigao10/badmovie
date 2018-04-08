import React from 'react';
import axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.saveToFaves = this.saveToFaves.bind(this)
  }

  componentDidMount(){
    this.props.getMovies()
  }

  saveToFaves(movie){
    axios.post('/save', {
      movie: movie
    })
  }

  render() {
    return (
      <ul className="movies">
      {
        this.props.movies.map((movie) => { 
          let date = (movie.release_date) ? movie.release_date.slice(0, 4) : 'none'
          return <li className="movie_item" onClick={() =>
            {
              console.log(this.props.showFaves)
              if(this.props.showFaves){
                this.props.deleteMovie(movie);
              } else {
                this.saveToFaves(movie);
              }
            }
          }><div>
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
}

export default Movies