import React, { useState, useEffect } from "react";
import { API_KEY, BASE_URL, request } from "../Constants/Constants";
import axios from "axios";
import "./rows.css";
import YouTube from "react-youtube";
import ClickAwayListener from "@mui/material/ClickAwayListener";

function RowCard(props) {
  const [movieId, setMovieId] = useState("");
  const [posterState, setPosterState] = useState([]);
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    getData(props);
  }, [props]);

  function getData(props) {
    setLoading(true)
    axios
      .get(`${BASE_URL}${props.type}`)
      .then((response) => {
        setPosterState(response.data.results);
      setLoading(false)
      })
      .catch((error) => {
        alert("Error fetching data:", error);
        setLoading(false)
      });
  }

  const opts = {
    height: "420",
    width: "780",
    playerVars: {
      autoplay: 1,
    },
  };

  function viewTrailer(movie_id) {
    setLoading(true)
    if (movie_id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
        )
        .then((res) => {
          console.log(res);
          if (res.data) {
            setMovieData(res.data);
            setOpen(true)
         }
        })
        .catch((error) => {
          alert("Trailer not available");
         
          console.error("Error fetching trailer:", error);
        });
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
        )
        .then((res) => {
          console.log(res);
          const key = res.data.results[0].key;
          if (key) {
            setMovieId(key);
            setOpen(true);
          }
        })
        .catch((error) => {
          alert("Trailer not available");
         
          console.error("Error fetching trailer:", error);
        });
    } else alert("Trailer not available");
    setLoading(false)
  }
  const handleClose = () => {
    setOpen(false);
    setMovieId("");
  };
  return (
    <>
    {loading && (
                <div className="loading-overlay">
                  <img src='https://cdn2.actitudfem.com/media/files/media/files/estrenos-netflix.gif' alt="Netflix Logo" />
                </div>
              )}
      <h3>{props.name}</h3>
      <div className="rowPost">
        {posterState.map((poster, index) => (
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
            <div className="modal-body ">
            
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
                )}{" "}
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

export default RowCard;
