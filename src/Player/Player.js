import { useState, useEffect } from "react"
// sets the player bar from spotify
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ token, trackUri }) {
  const [play, setPlay] = useState(false)
  // console.log(token)

  useEffect(() => setPlay(true), [trackUri])

  if (!token) return null
  return (
    <SpotifyPlayer
      token={token}

      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
