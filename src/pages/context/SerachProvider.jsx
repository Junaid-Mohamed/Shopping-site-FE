import { createContext, useContext, useState } from 'react';

// Create Context
const SerachContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');

  return (
    <SerachContext.Provider value={{ search, setSearch }}>
      {children}
    </SerachContext.Provider>
  );
};

// Custom Hook for using the Search Context
export const useSearch = () => useContext(SerachContext);
