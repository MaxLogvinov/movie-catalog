export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
}

export interface MovieSearchState {
  movies: Movie[];
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  searchQuery: string;
}

export interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
