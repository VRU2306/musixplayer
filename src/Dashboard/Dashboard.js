
import "./dashboard.css";
import "./Header.css"
import "./Footer.css"
import { useState, useEffect } from "react"
import { useStateValue } from "../StateProvider";
import Player from "../Player/Player";
import SearchIcon from '@mui/icons-material/Search';
// this package provides all the tracks,albums,artists,songs
import SpotifyWebApi from "spotify-web-api-node"
import axios from "../axios"
import { Avatar } from "@mui/material";
import TrackSearchResult from "../Player/Track"
const spotifyApi = new SpotifyWebApi({
  clientId: "f710544782484e3e98bfa8e8a44103df",
})

function Dashboard({ }) {
    const [{ user ,token}, dispatch] = useStateValue();

    //  const token = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!token) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, token])

    return (
            
        <div className='dashboard'>
       <div className="header">
      <div className="header__left">
        <SearchIcon style={{color:"#202328"}} />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "

           type="search"
       
        value={search}
       
        onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.body.images} />
      <h4>{ user?.body.display_name||"SPOTIFY"}</h4>
      </div>
    </div>
    <div>
      {!search&&!lyrics?<div className="text-center">Hello,Welcome to the Custom Music Player,<br></br>Search a music and Click on it ,<br></br>Music starts Playing</div>:
         <div>  
           {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}</div>}
        
        {searchResults.length === 0 && (
          <div>
            {lyrics==="No Lyrics Found"?(<div className="text-center" style={{}}>
          No Lyrics Found,<br></br> Head to the App and request Lyrics.
          </div>): 
          <div className="text-center" >
         {lyrics}
          </div>}
          
                
          </div>
        )}
    </div>
      <div className="footer">
          
        <Player  token={token} style={{ background:"#202328",color:"#fffff" }}trackUri={playingTrack?.uri} />
      </div>
        </div>
      
    )
}

export default Dashboard
