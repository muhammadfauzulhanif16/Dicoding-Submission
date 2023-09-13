export const getMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTg5OTFmMDIyYWRjZjVmZjAzYWMxYWIwYWJlNjQyMCIsInN1YiI6IjY0Zjk1MTg2OGUyMGM1MGNkNTBjYjgyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jVjDpJInliven0myaowUCFMZ5e1-nfS55IA_21NvDwo'
      }
    })

    const { results } = await response.json()
    return results
  } catch (error) {
    console.error(error)
  }
}
