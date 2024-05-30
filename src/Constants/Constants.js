export const BASE_URL='https://api.themoviedb.org/3';
export const API_KEY='8256564f3140d02ca02c68825c22e463';

export const request = {

  fetchBannerImage : `https://image.tmdb.org/t/p/original`,
  fetchPosterImage : `https://image.tmdb.org/t/p/w500`,

  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,

  // TV

  fetchTrendingTV: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginalsTV: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
  fetchAiringTodayTV: `/tv/airing_today?api_key=${API_KEY}&language=en-US`,
  fetchPopularTV: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTV: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,

  //  Movies

  fetchTrendingMovie: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchNowPlayingMovies: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
  fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`,

  //Search

  fetchSearchResult: `/search/multi?api_key=${API_KEY}&language=en-US&query=`,
  fetchSearchResultMovies: `/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  fetchSearchResultSeries: `/search/tv?api_key=${API_KEY}&language=en-US&query=`,
}