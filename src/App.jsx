import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage/LoginPage';
import {HomePage,Movies,Popular,Tvshows} from './HomePage/HomePage';

import Error from './Error';

function App(){

    return(
        <>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="*" element={<Error />} />
      </Routes>
        
        </>
    )
}

export default App

