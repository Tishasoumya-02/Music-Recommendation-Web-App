import React, { useEffect } from 'react';
// import Music from './components/Music-Library/Music';
import login from "./auth/login";
import register from "./auth/register";
import Alert from "./layout/Alert";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import './App.css'
import ChooseAction from './components/SawoLogIn/ChooseAction';
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import artists from './components/Artists-Selection/Artists';
import LoginPage from './components/SawoLogIn/SawoLogIn';
// import PrivateRoute from './auth/private-route';
import Library from './components/Library/Library';
import Searchresults from './components/Library/Searchresults';
// import ArtistsSearch from './components/Library/ArtistsSearch';
import Search from './components/Library/Search';
import Playlist from './components/Library/Playlist';
// import Favourite from './components/Library/Favourite';
import Spotify from './auth/spotifyRegister';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
      

        <Alert />
        <Switch>
          <Route  exact path="/" component={login} />
          <Route  exact path="/register" component={register} />
          <Route  exact path="/loginSawo" component={LoginPage} />
          <Route component={artists} path="/artists" />   
          <Route exact path="/library" component={Library} />  
          <Route  path="/loginSawo/choose-action" component={ChooseAction} />
          <Route path="/SearchResult" component={Searchresults}/>
          {/* <Route path="/ArtistsSearch" component={ArtistsSearch}/> */}
          <Route path="/Search" component={Search}/>
          <Route path="/Playlist" component={Playlist}/>
          {/* <Route path="/Favourite" component={Favourite}/> */}
          <Route path="/Spotify-login" component={Spotify}/>


        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
