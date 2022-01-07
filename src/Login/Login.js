import React from 'react'
import "./Login.css";
import { accessUrl } from "../Spotify";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f710544782484e3e98bfa8e8a44103df&response_type=code&redirect_uri=http://localhost:3001/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
    return (
        <div className="login">
             <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
           <a className="buttons" href={accessUrl}>
        Login With Spotify
      </a>
        </div>
    )
}

export default Login
