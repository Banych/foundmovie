import Movie from "./Movie";

export interface MoviesResult {
    Search: Movie[];
    totalResults: number;
    Response: boolean;
}