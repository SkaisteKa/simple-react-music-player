import React from 'react';
//import { playAudio } from '../util';

const LibrarySong = ({ song, songs, setCurrentSong, setSongs, isPlaying, audioRef }) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        const newSongs = songs.map(songItem => {
            if(song.id === songItem.id) {
                return {
                    ...songItem,
                    active: true
                }
            } else {
                return {
                    ...songItem,
                    active: false
                }
            }
        });
        setSongs(newSongs);
    //playAudio(isPlaying, audioRef);     
    if(isPlaying) audioRef.current.play();  
    };

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
           <img src={song.cover} alt={song.name} />
           <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
           </div>
        </div>
    )
}

export default LibrarySong;