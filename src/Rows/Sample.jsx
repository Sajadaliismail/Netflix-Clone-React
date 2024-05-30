import React, { useState } from "react";
import axios from "axios";
import { API_KEY, request } from "../Constants/Constants";
import  ClickAwayListener  from "@mui/material/ClickAwayListener";
import YouTube from "react-youtube";

function RowCards(props) {
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [movieId, setMovieId] = useState("");

  const opts = {
    height: "420",
    width: "780",
    playerVars: {
      autoplay: 1,
    },
  };

  function viewTrailer(movie_id) {
    if (movie_id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          setMovieData(res.data);
          setOpen(true);
        })
        .catch((error) => {
          alert("Error fetching movie details");
          console.error("Error fetching movie details:", error);
        });

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
        )
        .then((res) => {
          console.log(res.data);
          const key = res.data.results[0]?.key;
          if (key) {
            setMovieId(key);
          } else {
            alert("Trailer not available");
          }
        })
        .catch((error) => {
          alert("Error fetching trailer");
          console.error("Error fetching trailer:", error);
        });
    } else {
      alert("Trailer not available");
    }
  }

  const handleClose = () => {
    setOpen(false);
    setMovieId("");
    setMovieData(null);
  };

  return (
    <>
        <h3>Search results</h3>

      <div className="rowPost">

        {props.data.map((poster, index) => (
          <div key={index}>
            <img
              onClick={() => {
                viewTrailer(poster.id);
              }}
              className={props.isPoster ? "isLarge" : "isSmall"}
              src={`${request.fetchPosterImage}${poster.poster_path}`}
              alt={poster.title || poster.name}
            />
            <h6 className="text-center">
              {poster.title || poster.original_name}
            </h6>
          </div>
        ))}
      </div>

      <div
        className={`modal fade ${open ? "show" : ""}`}
        style={{ display: open ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg bg-dark">
          <div className="modal-content bg-dark">
            <div className="modal-header bg-dark">
              <h5 className="modal-title">Trailer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-block text-start">
                {movieData && (
                  <>
                    <h5 className="modal-title ">
                      {movieData.title}
                      <span className="badge bg-success ms-2">
                        {Math.floor(movieData.vote_average * 10)}%
                      </span>
                    </h5>
                    <p>{movieData.overview}</p>
                  </>
                )}
              </div>
              {movieId && (
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <YouTube videoId={movieId} opts={opts} />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default RowCards;
