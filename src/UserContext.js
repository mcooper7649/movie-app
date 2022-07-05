import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const User = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <User.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, alert, setAlert }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;

export const UserState = () => {
  return useContext(User);
};
