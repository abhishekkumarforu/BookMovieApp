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
    maxWidth: 240
  },
  cardHeader: {
    color: theme.palette.primary.light,
    margin: theme.spacing(),
    marginBottom: 0,
    minWidth: 240,
    maxWidth: 240
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function Home() {
  const classes = useStyles();

  const [movies, setMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  useEffect(() => {
    fetch("v1/movies", {
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
  }, []);

  console.log("render")

  return (
    <div>
      <Header />
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
              {movies.map((tile) => (
                <GridListTile key={tile.id} className="released-img">
                  <img src={tile.poster_url} alt={tile.title} />
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
                    {names.map((name) => (
                      <MenuItem key={name + "900"} value={name}>
                        <Checkbox checked={genres.indexOf(name) > -1} />
                        <ListItemText primary={name} />
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
                    {names.map((name) => (
                      <MenuItem key={name + "121"} value={name}>
                        <Checkbox checked={artists.indexOf(name) > -1} />
                        <ListItemText primary={name} />
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
                <Button variant="contained" color="primary" fullWidth={true}>
                  BOOK SHOW
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
