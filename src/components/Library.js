import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, setSongs, isPlaying, audioRef, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {songs.map((song) => (
                    <LibrarySong song={song} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} audioRef={audioRef} isPlaying={isPlaying} key={song.id} />
                ))}
            </div>
        </div>
    )
}

export default Library;