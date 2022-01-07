import React from "react"
import "./Track.css"
export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
     className="songRow"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}>
      <img src={track.albumUrl} className="songRow__album" />
      <div className="songRow__info">
        <h1>{track.title}</h1>
        <p>{track.artist}</p>
      </div>
    </div>
  )
}
