import { observer } from "mobx-react-lite";
import { FC, Fragment, useContext } from "react";
import { Card, Image, Placeholder } from "semantic-ui-react";
import Movie from "../Models/Movie";
import MoviesStore from "../stores/store.Movie";

interface MovieShortDetailsProps {
  movie: Movie;
}

const MovieShortDetails: FC<MovieShortDetailsProps> = ({ movie }) => {
  const moviesStore = useContext(MoviesStore);

  return (
    <Card href={`/movies/${movie.imdbID}`}>
      {moviesStore.loadingSearchingMovies ? (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      ) : (
        <Image src={movie.Poster} wrapped ui={false} />
      )}
      <Card.Content>
        {moviesStore.loadingSearchingMovies ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very long" />
              <Placeholder.Line length="short" />
            </Placeholder.Header>
          </Placeholder>
        ) : (
          <Fragment>
            <Card.Header>{movie.Title}</Card.Header>
            <Card.Meta>{movie.Type}</Card.Meta>
          </Fragment>
        )}
      </Card.Content>
      {moviesStore.loadingSearchingMovies ? (
        <Card.Content extra>
          <Placeholder>
            <Placeholder.Line length="short" />
          </Placeholder>
        </Card.Content>
      ) : (
        <Card.Content extra>Year: {movie.Year}</Card.Content>
      )}
    </Card>
  );
};

export default observer(MovieShortDetails);
