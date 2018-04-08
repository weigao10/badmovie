import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: 28
    }
    this.getGenres = this.getGenres.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount(){
    this.getGenres()
  }

  getGenres() {
    axios.get('/genres')
      .then((data) => {
        this.setState({genres: data.data});
      })
      .catch((err) => {
        console.log('err in client get req /genres', err)
      })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => { this.props.swapFavorites() }}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br /><br />
        <select value={this.state.selectedGenre} onChange={this.onChange}>
          {
            this.state.genres.map((genre) => (
              <option value={genre.id}>{genre.name}</option>
            ))
          }
        </select>
        <br/><br/>

        <button onClick={() => { 
          let genre = this.state.selectedGenre
          this.props.getMovies(genre) 
        }}>Search</button>

      </div>)
  }

  onChange(e){
    // console.log('in on change e', e.target.value)
    this.setState({
      selectedGenre: e.target.value
    })
  }
}

export default Search