import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Embed,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Popup,
  Progress,
} from "semantic-ui-react";
import AliceCarousel from "react-alice-carousel";
import { ParseValueRating } from "../api/helpers";
import MovieStore from "../stores/store.Movie";

interface DetailParams {
  id: string;
}

const MovieDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const movieStore = useContext(MovieStore);
  const { movie, loadMovie, searchYouTubeTrailers } = movieStore;

  useEffect(() => {
    loadMovie(match.params.id);
  }, [loadMovie]);

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={5}>
          <Image
            src={movie?.Poster}
            alt={movie?.Title}
            style={{ minWidth: "200px" }}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header size="huge">
            {movie?.Title}
            <Header.Subheader>{movie?.Plot}</Header.Subheader>
          </Header>
          <Header size="medium"></Header>
          <Grid>
            <Grid.Column width={5}>Language</Grid.Column>
            <Grid.Column width={11}>{movie?.Language}</Grid.Column>
          </Grid>
          <Header size="large">About</Header>
          <Grid divided="vertically">
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Year of release
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Year}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Country
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Country}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Genre
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Genre}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Director
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Director}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Writer
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Writer}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Production
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Production}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Box office
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.BoxOffice}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Actors
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Actors}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Rated
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Rated}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Date of release
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Released}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridRow">
              <Grid.Column className="gridColumn" width={5}>
                Runtime
              </Grid.Column>
              <Grid.Column className="gridColumn" width={11}>
                {movie?.Runtime}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header as="h1">
            <Icon name="star" fitted color="yellow" />
            <Header.Content>
              {movie?.imdbRating}
              <Popup
                trigger={
                  <Header.Subheader>{movie?.imdbVotes}</Header.Subheader>
                }
                content="Проголосовало"
                inverted
                position="bottom center"
              />
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid>
      <div className="movieRatings">
        <Header size="huge">Ratings</Header>
        <List horizontal size="big" divided>
          {movie?.Ratings
            ? movie.Ratings.map((x) => (
                <List.Item key={x.Source}>
                  {x.Source} - <Icon name="star" color="yellow" /> {x.Value}
                  <br />
                  <Progress
                    value={ParseValueRating(x.Value).value}
                    total={ParseValueRating(x.Value).maxValue}
                    size="tiny"
                    style={{ marginTop: "1rem" }}
                  />
                </List.Item>
              ))
            : "No ratings"}
        </List>
      </div>
      <div className="moviePosters">
        <Header size="huge">Trailers</Header>
        {movieStore.trailersRepository.size > 0 ? (
          <AliceCarousel
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1024: { items: 4 },
            }}
            autoPlay={true} 
            autoPlayInterval={2000}
            autoPlayStrategy='all'
            animationDuration={500}
            
          >
            {Array.from(movieStore.trailersRepository.values()).map(
              (trailer) => (
                <div key={trailer.etag}>
                  <Embed
                    autoplay={false}
                    source="youtube"
                    id={trailer.id.videoId}
                  />
                </div>
              )
            )}
          </AliceCarousel>
        ) : (
          "No trailers"
        )}
      </div>
    </Fragment>
  );
};

export default observer(MovieDetails);
