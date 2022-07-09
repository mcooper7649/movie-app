import axios from 'axios';
import './Trending.css';
import React, { useEffect, useState, Fragment } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

import { Helmet } from 'react-helmet-async';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  console.log(content);
  return (
    <Fragment>
      <Helmet>
        <title>Trending</title>
        <link rel="canonical" href="https://www.mycodedojo.com/" />
      </Helmet>
      <AnimatePresence>
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          exit={{ y: -1000 }}
        >
          <span className="pageTitle">Trending Today</span>
        </motion.div>
      </AnimatePresence>

      <div className="trending">
        {content &&
          content.map((c) => (
            <AnimatePresence key={c.id}>
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
                  title={
                    c.title?.substring(0, 20 + 1) ||
                    c.name?.substring(0, 20 + 1) ||
                    c.original_title?.substring(0, 20 + 1)
                  }
                  date={c.first_air_date || c.release_date}
                  media_type={c.media_type}
                  vote_average={c.vote_average.toFixed(1)}
                />
              </motion.div>
            </AnimatePresence>
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </Fragment>
  );
};

export default Trending;
