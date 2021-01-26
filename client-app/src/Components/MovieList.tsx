import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Card, Header, Pagination } from "semantic-ui-react";
import MoviesStore from "../stores/store.Movie";
import MovieShortDetails from "./MovieShortDetails";

const MovieList = () => {
  const moviesStore = useContext(MoviesStore);

  return (
    <Fragment>
      <Header size="large">Search results:</Header>
      <Card.Group doubling stackable centered itemsPerRow={5}>
        {moviesStore.MoviesByYear.map((movie) => (
          <MovieShortDetails key={movie.imdbID} movie={movie} />
        ))}
      </Card.Group>
      <Pagination 
      
        activePage={moviesStore.activeSearchedPage}
        totalPages={moviesStore.TotalSearchPage}
        onPageChange={(e, data) =>
          moviesStore.onChangeActivePage(data.activePage)
        }
      />
    </Fragment>
  );
};

export default observer(MovieList);
