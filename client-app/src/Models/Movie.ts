import { IRating } from "./IRating"

export default interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
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
    Ratings: IRating[];
    Metascore: number;
    imdbRating: number;
    imdbVotes: number;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: boolean;
}