import axios from 'axios';
import { useEffect, useState } from 'react';
import Genres from '../../components/Genres';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  // console.log(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <Helmet>
        <title>Movies</title>
        <link rel="canonical" href="https://www.mycodedojo.com/" />
      </Helmet>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <span className="pageTitle">Discover Movies</span>
      </motion.div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, type: 'tween' }}
              key={c.id}
            >
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            </motion.div>
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
