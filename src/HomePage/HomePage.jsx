import React,{ useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Homepage.css'
import { API_KEY, request } from "../Constants/Constants";
import Content from "../Banner/Banner";
import RowCard from "../Rows/Rows";
import axios from "axios";
import RowCards from "../Rows/Sample";
import { Link } from "react-router-dom";
import { SearchContext } from "../Contexts/SearchContexts";
import { SearchInputContext } from "../Contexts/SearchInputContext";




function Header() {
    const {search, setSearch} = useContext(SearchInputContext);
    const {searchResults, setSearchResults} = useContext(SearchContext)
    const [typingTimeout, setTypingTimeout] = useState(0);
  
    function handleInput(e) {
      const searchTerm = e.target.value;
      setSearch(searchTerm);
  
      clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => {
        if (searchTerm.trim() !== '') {
          axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`)
            .then(response => {
              if (response.data.results.length > 0) {
                setSearchResults(response.data.results);
              } else {
                setSearchResults([]);
              }
            })
            .catch(error => {
              alert('Some error occurred');
              setSearchResults([]);
              console.log(error);
            });
        } else {
          setSearchResults([]);
        }
      }, 500)); 
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      handleInput(e); 
    }

    const clearInput = () => {
        setSearch('');
        setSearchResults([])
      };
  
    return (
      <>
        <nav className="navbar">
          <div className="container-fluid d-flex justify-content-between text-white">
            <div className="ps-5 pt-2 gap-4 d-flex">
              <img style={{ width: '110px' }} src="/nf-logo.png" alt="" />
              <Link className="nav-link" to='/home'>Home</Link>
              <Link className="nav-link" to='/tvshows'>TV Shows</Link>
              <Link className="nav-link" to='/movies'>Movies</Link>
              <Link className="nav-link" to='/popular'>Popular</Link>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 pe-5">
              <form className="d-flex align-items-center justify-content-center" onSubmit={handleSubmit}>
              {search && (
        <button className="btn btn-sm btn-danger me-2" onClick={clearInput}>Clear</button>
      )}
                <input  value={search} onChange={handleInput} type="text" placeholder="Search movies..." />
               
              </form>
            </div>
          </div>
        </nav>
        <div style={{ paddingTop: '' }}>
          {searchResults.length > 0 && <RowCards data={searchResults} />}
        </div>
      </>
    );
  }

export const HomePage=()=>{
    return (
        <>
    <Header/>
    <Content type={request.fetchTrendingMovie}/>
    <RowCard type={request.fetchNetflixOriginalsTV} name='Netflix Originals' isPoster />
    <RowCard type={request.fetchPopularMovies} name='Popular'/>
    <RowCard type={request.fetchTopRatedMovies} name='Top rated'/>
    <RowCard type={request.fetchNowPlayingMovies} name='Now playing'/>
        </>
    )
}

export const Tvshows=()=>{
    return (
        <>
    <Header/>
    <Content type={request.fetchAiringTodayTV}/>
    <RowCard type={request.fetchNetflixOriginalsTV} name='Netflix Originals' isPoster />
    <RowCard type={request.fetchPopularTV} name='Popular'/>
    <RowCard type={request.fetchTopRatedTV} name='Top rated'/>
    <RowCard type={request.fetchTrendingTV} name='Trending'/>
        </>
    )
}

export const Movies=()=>{
    return (
        <>
    <Header/>
    <Content type={request.fetchActionMovies}/>
    <RowCard type={request.fetchComedyMovies} name='Comedy movies' isPoster />
    <RowCard type={request.fetchHorrorMovies} name='Horror'/>
    <RowCard type={request.fetchRomanceMovies} name='Romance'/>
    <RowCard type={request.fetchTrendingMovie} name='Trending'/>
    <RowCard type={request.fetchPopularMovies} name='Popular'/>
    <RowCard type={request.fetchTopRatedMovies} name='Top rated'/>
        </>
    )
}

export const Popular=()=>{
    return (
        <>
    <Header/>
    <Content type={request.fetchPopularMovies}/>
    <RowCard type={request.fetchPopularTV} name='Popular Tv' isPoster />
    <RowCard type={request.fetchNowPlayingMovies} name='Now playing'/>
        </>
    )
}








// export default HomePage