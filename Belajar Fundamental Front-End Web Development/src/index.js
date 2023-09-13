import './style/style.css'
import './components/movie-list.js'
import { getMovies } from './api'

const movieListElement = document.createElement('movie-list')

getMovies().then((movies) => {
  movieListElement.movies = movies
})

document.body.appendChild(movieListElement)
