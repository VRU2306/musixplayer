import { useEffect } from 'react';
import './App.css';
import Login from "./Login/Login"
import SpotifyWebApi from "spotify-web-api-node";
import Dashboard from "./Dashboard/Dashboard";
import { useStateValue } from "./StateProvider";
import HomePage from "./Homepage"
import { getTokenFromResponse } from "./Spotify";
// const code = new URLSearchParams(window.location.search).get("code")
  const s = new SpotifyWebApi();
function App() {

 const [ {token} , dispatch] = useStateValue();

 useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

  
      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);
  return(  <> {!token && <Login />}
      {token && <HomePage spotify={s} />}</>)
}

export default App;
