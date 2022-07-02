import React, { createContext, useContext, useState } from 'react';

const User = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <User.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </User.Provider>
  );
};

export default UserContext;

export const UserState = () => {
  return useContext(User);
};
