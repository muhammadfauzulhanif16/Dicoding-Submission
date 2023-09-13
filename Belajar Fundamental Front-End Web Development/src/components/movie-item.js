class MovieItem extends HTMLElement {
  set movie (movie) {
    this._movie = movie
    this.render()
  }

  render () {
    this.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w185${this._movie.poster_path}" alt="poster"> 

    <p>${this._movie.title}</p>
    `
  }
}

customElements.define('movie-item', MovieItem)
