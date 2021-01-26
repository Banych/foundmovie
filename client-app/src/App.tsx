import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import NavBar from "./Components/NavBar";
import MovieList from "./Components/MovieList";
import { observer } from "mobx-react-lite";
import MoviesStore from "../src/stores/store.Movie";
import { Route } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const moviesStore = useContext(MoviesStore);

  useEffect(() => {
    moviesStore.searchMovies();
  }, [moviesStore]);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <Route exact path="/" component={MovieList} />
        <Route exact path="/movies/:id" component={MovieDetails} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
