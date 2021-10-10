import React/*, { useEffect }*/ from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
//import { playAudio } from '../util';


const Player = ({songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, setSongs }) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map(songItem => {
            if(nextPrev.id === songItem.id) {
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
        //playAudio(isPlaying, audioRef)
        if(isPlaying) audioRef.current.play();
    }

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    } 

    const skipTrackHandler = async (directions) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if(directions === 'skip-back') {
            await setCurrentSong(songs[currentIndex > 0 ? currentIndex - 1 : songs.length - 1]);
            activeLibraryHandler(songs[currentIndex > 0 ? currentIndex - 1 : songs.length - 1]);
        }
        if(directions === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
    }

    const getTime = (time) => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return (
        <div className="player">
           <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                <div style={trackAnim} className="animated-track"></div>
             </div>
            <p>{songInfo.duration ? getTime(songInfo.duration) : "     "}</p>
           </div>
           <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause: faPlay} />
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
           </div>
        </div>
    )
}

export default Player;