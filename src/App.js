import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Alert from './components/Alert';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Header />
        <Helmet prioritizeSeoTags>
          <title>The Watchlist</title>
          <meta
            name="url"
            property="og:url"
            content="https://fascinating-duckanoo-e09707.netlify.app/"
            data-react-helmet="true"
          />
          <meta
            name="description"
            property="og:description"
            content="The Watchlist helps manage your media intake so you don't have to."
            data-react-helmet="true"
          />
          <meta
            name="image"
            property="og:image"
            content="https://img001.prntscr.com/file/img001/D1ou21R1SPeoZ8RcqYZTFg.png"
            data-react-helmet="true"
          />
        </Helmet>
        <div className="App">
          <Container>
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
        <Alert />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
