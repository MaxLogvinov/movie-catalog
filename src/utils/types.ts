export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieSearchState {
  movies: Movie[];
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  searchQuery: string;
  currentPage: number;
  totalResults: string;
  hasMore: boolean;
}

export interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
