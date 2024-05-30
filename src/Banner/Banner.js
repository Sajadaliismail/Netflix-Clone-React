import React,{useState, useEffect} from "react";
import axios from './../axios'
import { API_KEY,request } from "../Constants/Constants";
import YouTube from 'react-youtube';
import ClickAwayListener from '@mui/material/ClickAwayListener';

function Content(props){
    const [movieId, setMovieId] = useState('');
    const [open,setOpen] = useState(false);
    const [movieData,setMovieData] = useState()
    const [banner,setBanner] = useState()

    function getBanner(props){
    const index = Math.floor(Math.random()*20)
        axios.get(`${props.type}?api_key=${API_KEY}`).then(
            (response)=>{
                setBanner(response.data.results[index])
            }
        )
    }
    useEffect(()=>{
        getBanner(props)
    },[props])

    const opts = {
        height: '420',
        width: '780',
        playerVars: {
          autoplay: 1,
        },
      };

    function viewTrailer(movie_id) {
        if(movie_id)
        {axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`).then((res)=>{
            if(res.data) {
        setMovieData(res.data)}
        }).catch((error)=>{
            alert('Trailer not available')
          console.error("Error fetching trailer:", error);

        })
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`).then((res) => {
          const key = res.data.results[0]?.key;
          if (key) {
            setMovieId(key);
            setOpen(true);
          }
        }).catch((error) => {
            alert('Trailer not available')
          console.error("Error fetching trailer:", error);
        });} else alert('Trailer not available')     
      }
      const handleClose = () => {
        setOpen(false);
        setMovieId('');
      }
    
    return (
        <>        
       {banner &&  <>
        <div style={{backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.45)), 
                                      url("${request.fetchBannerImage}${banner.backdrop_path})`,alignContent:"center"}} className="banner text-white fw-bold ps-5">
        <h5 className=""><span className="text-danger">NETFLIX </span>ORIGINAL</h5>
        <h1 >{banner.title}</h1>
       <button onClick={() => { viewTrailer(banner.id); }} className="btn btn-danger">
        <i className="bi bi-play-fill" style={{ fontSize: '1rem' }}></i>PLAY
        </button>
       <button  className="btn btn-rounded ms-2 btn-dark text-white">
        <i className="bi bi-plus" style={{ fontSize: '1rem' }}></i>Add to List
        </button>
       <p style={{width:'50%'}} className="fw-light">{banner.overview} </p>
       </div>
       </>
       }

<div className={`modal fade ${open ? 'show' : ''}`} style={{ display: open ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-lg bg-dark">
          <div className="modal-content bg-dark">
            <div className="modal-header bg-dark">
              <h5 className="modal-title">Trailer</h5>
              
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body ">
           <div className="d-block text-start">
            {movieData && (<>
                <h5 className="modal-title ">
                        {movieData.title}
                        <span className="badge bg-success ms-2">{Math.floor(movieData.vote_average * 10)}%</span>
                    </h5>
                <p>{movieData.overview}</p>
                </>)}   </div>
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
    )
}

export default Content