import React, { createContext, useState } from "react";

export const SearchInputContext = createContext(null);

const InputContext = ({ children }) => {
    const [search, setSearch] = useState('');

    return (
        <SearchInputContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchInputContext.Provider>
    );
};

export default InputContext;
