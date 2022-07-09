import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, Button } from '@material-ui/core';
import { UserState } from '../../UserContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
    backgroundColor: '#39445a',
  },
  profile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '92%',
    color: 'white',
  },
  logout: {
    height: '8%',
    width: '100%',
    alignItems: 'center',
    fontSize: '1.5rem',
    color: 'whitesmoke',
    fontWeight: 'bold',
    backgroundColor: '#83b6ec',
    marginTop: 20,
    '&:hover': {
      background: 'red',
    },
  },
  picture: {
    width: 200,
    height: 200,
    cursor: 'pointer',
    backgroundColor: '#83b6ec',
    objectFit: 'contain',
  },
  watchlist: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    overflowY: 'scroll',
  },
  movie: {
    padding: 10,
    borderRadius: 5,
    color: 'black',
    fontSize: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#83b6ec',
    boxShadow: '0 0 3px black',
    '&:last-child': {
      border: 'solid 3px #cccccc',
    },
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, movies, setMovies } = UserState();

  console.log(watchlist, movies);

  useEffect(() => {
    setMovies(watchlist);
  }, [setMovies, watchlist]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successfull!',
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (movie) => {
    const movieRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        movieRef,
        { movies: watchlist.filter((wish) => wish !== movie) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${movie} Removed from the Watchlist!`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginTop: 7,
              cursor: 'pointer',
              backgroundColor: '#EEBC1D',
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: '100%',
                    fontSize: 25,
                    textAlign: 'center',
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <span style={{ fontSize: 15, textShadow: '0 0 5px white' }}>
                  Watchlist
                </span>
                <div className={classes.watchlist}>
                  {movies.map((movie) => {
                    console.log(watchlist);
                    console.log(movie);
                    if (watchlist.includes(movie))
                      return (
                        <div key={movie.id} className={classes.movie}>
                          <AnimatePresence key={movie}>
                            <motion.div
                              whileInView={{ opacity: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5, type: 'tween' }}
                              key={movie}
                            >
                              <span key={movie.id}>{movie}</span>
                            </motion.div>
                          </AnimatePresence>
                          <AnimatePresence key={movie}>
                            <motion.div
                              whileInView={{ opacity: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.15, type: 'tween' }}
                              key={movie}
                            >
                              <span
                                key={movie.id}
                                style={{ display: 'flex', gap: 8 }}
                              >
                                <AiFillDelete
                                  key={movie.id}
                                  style={{ cursor: 'pointer' }}
                                  fontSize="16"
                                  onClick={() => removeFromWatchlist(movie)}
                                />
                              </span>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
