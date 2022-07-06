import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const User = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const movieRef = doc(db, 'watchlist', user.uid);

      var unsubscribe = onSnapshot(movieRef, (movie) => {
        if (movie.exists()) {
          console.log('movie added');
          setWatchlist(movie.data().movies);
        } else {
          console.log('No Items in Watchlist');
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <User.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        alert,
        setAlert,
        movies,
        setMovies,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;

export const UserState = () => {
  return useContext(User);
};
