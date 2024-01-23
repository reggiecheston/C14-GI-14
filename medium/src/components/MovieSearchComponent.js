import React, { Component } from "react";

export default class MovieSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: "",
      searchResults: [],
    };
  }

  APIKEY = "cecf8342c3d41e9e916ff0a82acd0445";

  handleInputChange = (e) => {
    this.setState({ movieTitle: e.target.value });
  };

  handleSearch = async (e) => {
    e.preventDefault();

    const { movieTitle } = this.state;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movieTitle
      )}&api_key=${this.APIKEY}`
    );
    const data = await response.json();

    if (data.total_results === 0) {
      this.setState({
        searchResults: [
          <div key="no-results" className="results-count">
            <small>Your search didn't match any movies.</small>
          </div>,
        ],
      });
    } else {
      const results = [
        <div key="results-count" className="results-count">
          <small>
            {data.results.length} results for "{movieTitle}"
          </small>
        </div>,
      ];

      data.results.forEach((m) =>
        results.push(
          <div key={m.id} className="search-result">
            <img
              src={`https://image.tmdb.org/t/p/w300/${m.poster_path}`}
              alt={`${m.original_title} poster`}
            />
            <div class="movie-details">
              <h3 class="movie-title">{m.original_title}</h3>
              <p class="movie-overview">{m.overview}</p>
              <div class="movie-details__btns"></div>
            </div>
          </div>
        )
      );

      this.setState({ searchResults: results });
    }
  };

  handleTitleClick = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <div>
        <body>
          <header>
            <h1 onClick={this.handleTitleClick}>Search Movies</h1>
            <div className="search-bar">
              <form onSubmit={this.handleSearch}>
                <input
                  name="movieTitle"
                  placeholder="Movie Title"
                  value={this.state.movieTitle}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <ul className="links">
              <li className="link">Movies</li>
              <li className="link">Genres</li>
              <li className="link">Login</li>
              <li className="link link-cta">Sign up</li>
            </ul>
          </header>
          <div className="main-content">
            <div id="search-results">{this.state.searchResults}</div>
          </div>
        </body>
      </div>
    );
  }
}
