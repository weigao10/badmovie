//client

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false
  	}
    this.getMovies = this.getMovies.bind(this)
    this.displayFaves = this.displayFaves.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
  }

  getMovies(genre) {
    axios.post('/search', {genre: genre || 28})
    .then((data) => {
      this.setState({
        movies: data.data
      })
    })
    .catch((err) => {
      console.log('err')
    })
  }

  displayFaves() {
    axios.get('/faves')
    .then((response) => {
      this.setState({
        favorites: response.data
      })
    })
    .catch((err) => {
      console.log('err in client get req /faves')
    })
    
  }

  deleteMovie(movie) {
    axios.post('/delete', {
      movie: movie
    })
    .then((response) => {
      this.displayFaves();
    })
    .catch((err) => {
      console.log('err in client get req /delete')
    })
    //same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} 
                showFaves={this.state.showFaves} 
                getMovies={this.getMovies}
                displayFaves={this.displayFaves}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
                        showFaves={this.state.showFaves} 
                        getMovies={this.getMovies} 
                        displayFaves={this.displayFaves}
                        deleteMovie={this.deleteMovie}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));