import React, { createContext, useContext, useState } from "react";

// export const DataContext = createContext({ isAuthenticated: false });
export const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

const Appwrapper = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState("");
  const [reload, setreload] = useState(false);
  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setuser,
        reload,
        setreload,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Appwrapper;
