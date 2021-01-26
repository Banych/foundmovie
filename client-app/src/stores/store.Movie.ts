import { observable, action, runInAction, configure, computed } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import youTubeAgent from "../api/youTubeAgent";
import { IYouTubeVideo } from "../Models/IYouTubeVideo";
import Movie from "../Models/Movie";

configure({ enforceActions: 'always' });

class MoviesStore {
    @observable moviesRepository = new Map<string, Movie>();
    @observable trailersRepository = new Map<string, IYouTubeVideo>();
    @observable movie: Movie | undefined;
    @observable loadingSearchingMovies = false;
    @observable loadingSearchYouTubeTrailers = false;
    @observable searchQuery = 'man';
    @observable totalCountSearchedMovies = 0;
    @observable cardsPerPage = 10;
    @observable activeSearchedPage = 1;

    @computed get MoviesByYear() {
        return Array.from(this.moviesRepository.values());//.sort((a, b) => Date.parse(a.Year) - Date.parse(b.Year));
    }

    @computed get TotalSearchPage() {
        return Math.floor(this.totalCountSearchedMovies / this.cardsPerPage);
    }

    @action searchMovies = async () => {
        if (!this.searchQuery) return;
        this.loadingSearchingMovies = true;
        try {
            const movies = await agent.Movies.list(this.searchQuery, this.activeSearchedPage);
            runInAction('load movies', () => {
                this.totalCountSearchedMovies = movies.totalResults;
                this.moviesRepository.clear();
                movies.Search.forEach(movie => {
                    this.moviesRepository.set(movie.imdbID, movie);
                });
                this.loadingSearchingMovies = false;
            })
        } catch (error) {
            runInAction('error load movies', () => {
                this.loadingSearchingMovies = false;
            });
            console.log(error);
        }
    }

    @action searchYouTubeTrailers = async () => {
        if (!this.movie?.Title) return;
        this.loadingSearchYouTubeTrailers = true;
        try {
            const trailers = await youTubeAgent.YouTube.search(this.movie.Title);
            runInAction('search trailers', () => {
                this.trailersRepository.clear();
                trailers.items.forEach(trailer => {
                    this.trailersRepository.set(trailer.etag, trailer);
                });
                this.loadingSearchYouTubeTrailers = false;
            })
        } catch (error) {
            runInAction('search trailers error', () => {
                this.loadingSearchYouTubeTrailers = false;
            })
            console.log(error);
        }
    }

    @action setSearchQuery = (query: string) => {
        this.searchQuery = query;
    }

    @action loadMovie = async (id: string) => {
        let movie = this.getMovie(id);
        if (movie)
            this.movie = movie;
        else {
            this.loadingSearchingMovies = true;
            try {
                movie = await agent.Movies.details(id);
                runInAction("getting movie", async () => {
                    this.movie = movie;
                    this.loadingSearchingMovies = false;
                });
            } catch (error) {
                runInAction("getting movie error", () => {
                    this.loadingSearchingMovies = false;
                });
                console.log(error);
            }
        }
        await this.searchYouTubeTrailers();
    }

    @action onChangeActivePage = (page: string | number | undefined) => {
        if (page) {
            this.activeSearchedPage = Number.parseInt(page.toString());
            this.searchMovies();
        }
    }

    getMovie(id: string) {
        return this.moviesRepository.get(id);
    }
}

export default createContext(new MoviesStore());