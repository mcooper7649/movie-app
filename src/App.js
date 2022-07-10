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
        <Helmet>
          <meta charSet="utf-8" />
          <title>The Watchlist</title>
          <meta
            name="url"
            property="og:url"
            content="https://events-project-nextjs.vercel.app/"
          />
          <meta
            name="description"
            property="og:description"
            content="The Watchlist helps manage your media intake so you don't have to."
          />
          <meta
            name="image"
            property="og:image"
            content="https://img001.prntscr.com/file/img001/zrR2MSYcT9K-REVUF4vkHg.png"
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
