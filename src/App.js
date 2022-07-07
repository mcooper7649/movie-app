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
          <title>Entertainment Hub</title>
          <link rel="canonical" href="https://www.mycodedojo.com/" />
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
