import { Chip } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        padding: '6px 0',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="medium"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <AnimatePresence key={genre.id}>
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            key={genre.id}
          >
            <Chip
              style={{ margin: 2 }}
              label={genre.name}
              key={genre.id}
              clickable
              size="medium"
              onClick={() => handleAdd(genre)}
            />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default Genres;
