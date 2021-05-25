import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import {
  Typography,
  GridList,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./Details.css";
import YouTube from "react-youtube";

function Details(props) {
  const [movie, setMovie] = useState(null);

  const getMovieDetails = () => {
    fetch(`${props.baseUrl}movies/${props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.id === props.match.params.id) setMovie(response);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const goToBookShowPage = () => {
    props.history.push(`/bookshow/${props.match.params.id}`);
  };

  let date = movie && movie.release_date ? new Date(movie.release_date) : null;
  let release_date = date ? date.toDateString() : "MM/DD/YYYY";
  return (
    <div>
      <Header baseUrl={props.baseUrl} bookshow={goToBookShowPage} />
      <div>
        <div className="back-btn">
          <Typography component="a" onClick={() => props.history.push("/")}>
            {"< Back to Home"}
          </Typography>
        </div>
      </div>
      {movie && (
        <div className="section-container">
          <div className="left-section">
            <div>
              <img src={movie.poster_url} alt="" width="100%" />
            </div>
          </div>
          <div className="middle-section">
            <Typography variant="h4">{movie.title}</Typography>
            <br />
            <div>
              <span className="subtitle">Genre: </span>
              <span>{movie.genres && movie.genres.join(",")}</span>
            </div>
            <br />
            <div>
              <span className="subtitle">Duration: </span>
              <span>148</span>
            </div>
            <br />
            <div>
              <span className="subtitle">Release Date: </span>
              <span>{release_date}</span>
            </div>
            <br />
            <div>
              <span className="subtitle">Rating: </span>
              <span>{movie.rating}</span>
            </div>
            <br />
            <br />
            <div>
              <span className="subtitle">Plot: </span>
              <span>
                <a href={movie.wiki_url} target="_blank">
                  (Wiki Link)
                </a>
                <span>{movie.storyline}</span>
              </span>
            </div>
            <br />
            <br />
            <span className="subtitle">Trailer: </span>
            <br />
            <br />
            {movie.trailer_url && <YouTube
              videoId={movie.trailer_url.split("?v=")[1]}
              opts={{ height: "390", width: "100%" }}
            />}
          </div>
          <div className="right-section">
            <Typography variant="h6">Rate this movie:</Typography>
            <Rating
              size="medium" name="rating"
            />
            <br />
            <br />
            <Typography variant="h6">Artists:</Typography>
            <br />
            <GridList style={{ flexWrap: "wrap" }} cols={2} cellHeight={200}>
              {movie.artists && movie.artists.map((tile) => (
                <GridListTile key={tile.id} className="artist-img">
                  <img src={tile.profile_url} alt={tile.title} />
                  <GridListTileBar
                    title={tile.first_name + " " + tile.last_name}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
