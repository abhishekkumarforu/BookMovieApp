import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";

import "./Home.css";
import {
  GridList,
  GridListTile,
  makeStyles,
  GridListTileBar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  card: {
    margin: theme.spacing(),
    minWidth: 240,
    maxWidth: 240,
  },
  cardHeader: {
    color: theme.palette.primary.light,
    margin: theme.spacing(),
    marginBottom: 0,
    minWidth: 240,
    maxWidth: 240,
  },
}));

function Home(props) {
  const classes = useStyles();

  const [movies, setMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const getMovies = () => {
    fetch(props.baseUrl + "movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.movies);
      });
  };

  const getReleasedMovies = () => {
    let genresStr = genres.length > 0 && "genre=" + genres.join(',')
    let artistsStr = artists.length > 0 && "artists=" + artists.join(',')
    let title = movieName && 'title=' + movieName
    let query = `?page=1&limit=10${title?'&'+title:''}${genresStr?'&'+genresStr:''}${artistsStr?'&'+artistsStr:''}`
    fetch(`${props.baseUrl}movies${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setReleasedMovies(response.movies);
      });
  };

  const getGenresMovies = () => {
    fetch(props.baseUrl + "genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setGenresList(response.genres);
      });
  };

  const getArtistsMovies = () => {
    fetch(props.baseUrl + "artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setArtistsList(response.artists);
      });
  };

  const goToDetailsPage = (id) => {
    props.history.push(`/movie/${id}`)
  }

  useEffect(() => {
    getMovies();
    getGenresMovies();
    getArtistsMovies();
    getReleasedMovies()
  }, []);

  return (
    <div>
      <Header baseUrl={props.baseUrl} />
      <div className="home">
        <div className="upcoming-header">Upcoming Movies</div>
        <div>
          <GridList cellHeight={250} cols={6} className={classes.gridList}>
            {movies.map((tile) => (
              <GridListTile key={tile.id}>
                <img src={tile.poster_url} alt={tile.title} />
                <GridListTileBar title={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="released-container">
          <div className="released-movies-section">
            <GridList cellHeight={350} cols={4}>
              {releasedMovies.map((tile) => (
                <GridListTile key={tile.id} className="released-img">
                  <img src={tile.poster_url} alt={tile.title} onClick={()=>goToDetailsPage(tile.id)} />
                  <GridListTileBar title={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="filter-section">
            <Card>
              <CardHeader
                title="FIND MOVIES BY:"
                className={classes.cardHeader}
              />
              <CardContent className={classes.card}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
                  <Input
                    id="movie-name"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="genres-select">Genres</InputLabel>
                  <Select
                    id="genres-select"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    multiple
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {genresList.map((genre) => (
                      <MenuItem key={genre.id} value={genre.genre}>
                        <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                        <ListItemText primary={genre.genre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="artist-select">Artists</InputLabel>
                  <Select
                    id="artists-select"
                    value={artists}
                    onChange={(e) => setArtists(e.target.value)}
                    multiple
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {artistsList.map((artist) => (
                      <MenuItem key={artist.id} value={artist.first_name+' '+artist.last_name}>
                        <Checkbox checked={artists.indexOf(artist.first_name+' '+artist.last_name) > -1} />
                        <ListItemText primary={artist.first_name+' '+artist.last_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="date-start" shrink={true}>
                    Release Date Start
                  </InputLabel>
                  <Input
                    id="date-start"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    type="date"
                  />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="date-end" shrink={true}>
                    Release Date End
                  </InputLabel>
                  <Input
                    id="date-end"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    type="date"
                  />
                </FormControl>
                <br />
                <br />
                <br />
                <Button variant="contained" color="primary" fullWidth={true} onClick={getReleasedMovies}>
                  Apply
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
