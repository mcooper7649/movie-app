import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  custom: {
    color: '#39445a',
    fontWeight: 'bold',
    marginTop: '6rem',
    paddingTop: '3rem',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    fontSize: '5rem',
  },
});

const Search = () => {
  const classes = useStyles();

  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [adult, setAdult] = useState(false);

  const handleChange = () => {
    setAdult(!adult);
    console.log(adult);
  };

  const darkTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#fff',
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=${adult}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page, adult, searchText]);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Search</title>
          <link rel="canonical" href="https://www.mycodedojo.com/" />
        </Helmet>
        <ThemeProvider theme={darkTheme}>
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Typography className={classes.custom} align="center" variant="h1">
              Search
            </Typography>
          </motion.div>

          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Search Options</FormLabel> */}
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Include Adult Content"
                  labelPlacement="top"
                  style={{ color: 'white' }}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormControl>
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>

          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: '50%' }} label="Search Movies" />
            <Tab style={{ width: '50%' }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>

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
                    media_type={type ? 'tv' : 'movie'}
                    vote_average={c.vote_average}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </HelmetProvider>
    </div>
  );
};

export default Search;
