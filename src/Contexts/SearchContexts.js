import React, { createContext, useState } from "react";

export const SearchContext = createContext(null);
 
const Context = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export default Context;
