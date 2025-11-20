export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface FullMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
}

export interface MovieSearchState {
  movies: Movie[];
  topMovies: Movie[];
  moviesDetails: { [imdbID: string]: FullMovie };
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  searchQuery: string;
  currentPage: number;
  totalResults: string;
}

export interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
