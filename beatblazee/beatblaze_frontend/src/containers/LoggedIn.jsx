import { useState, useContext, useLayoutEffect, useEffect, useRef } from "react";
import Icon from '../components/Icon.jsx'
import { useCookies } from "react-cookie";
import UserProfileIcon from "../components/UserProfileIcon.jsx";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import PropTypes from 'prop-types';
import songContext from "../contexts/songContext.jsx";
import CreatePlaylist from "../modals/CreatePlaylist.jsx";
import AddToPlaylist from "../modals/AddToPlaylist.jsx";
import { makeAuthenticatedPOSTRequest, makeAuthenticatedGETRequest } from "../utils/serveRoutes.jsx";

const LoggedIn = ({ children, currActive }) => {
  const [activeTab, setActiveTab] = useState(currActive);
  const [hoverTab, setHoverTab] = useState(null);
  const [cookie] = useCookies(['tokenForAuth', 'tokenForUserName']);
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
    useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);



  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleTabHover = (tab) => {
    setHoverTab(tab);
  };
  const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, songDuration, setSongDuration, currSongDuration, setCurrSongDuration, isPaused, setIsPaused, circlePosition, setCirclePosition, volume, setVolume, volumeIcon, setVolumeIcon, checkLikeOrNot, setCheckLikeOrNot, currSongList, setCurrentSongList, repeat, setRepeat, shuffle, setShuffle } = useContext(songContext);
  const volumePercent = (volume - 0) / (1 - 0) * 100;
  const originalVol = useRef(0);

  const firstUpdate = useRef(true);
  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  }
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSound(currentSong.track)
  }, [currentSong])
  const changeSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
      volume: volume
    });
    setSoundPlayed(sound);
    sound.on('load', () => {
      setSongDuration(sound.duration());
    }
    )
    let timerId;
    sound.on('play', () => {
      // Start a timer to update the current time every second
      timerId = setInterval(() => {
        setCurrSongDuration(Math.ceil(sound.seek()));
      }, 1000);
    });

    sound.on('pause', () => {
      // Stop the timer when the sound is paused
      clearInterval(timerId);
    });

    sound.on('stop', () => {
      // Stop the timer when the sound is stopped
      clearInterval(timerId);
    });
    
    console.log(sound);
    setIsPaused(false);
    sound.play();
  }
  const pauseSound = () => {
    soundPlayed.pause();
  }
  const togglePlayPuase = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    }
    else {
      pauseSound();
      setIsPaused(true);
    }
  }

  function formatDuration(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  const handleSeek = (e) => {
    const percent = (e.nativeEvent.offsetX / e.target.getBoundingClientRect().width) * 100;
    const newTime = (soundPlayed.duration() * percent) / 100;
    // Update the current time of the song
    setCurrSongDuration(newTime);

    // Update the seekbar and circle positions
    // Note: You might need to adjust the selectors and styles according to your actual implementation
    const seekbar = document.querySelector('.seekbar');
    const circle = document.querySelector('.circle');
    if (seekbar && circle) {
      seekbar.style.background = `linear-gradient(to right, white ${percent}%, grey ${percent}%)`;
      circle.style.left = `${percent}%`;
    }

    // Seek to the new time in the song
    if (soundPlayed) {
      soundPlayed.seek(newTime);
    }
  };
  useEffect(() => {
    if (currSongDuration) {
      const percent = (currSongDuration / songDuration) * 100;
      setCirclePosition(percent);
    }
  }, [currSongDuration, songDuration]);


  const addSongToLikedSongs = async () => {
    const songId = currentSong._id;
    const payload = { songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/song/add/likedsong",
      payload
    );
    if (response) {
      console.log('successfully added to liked songs');
    }
    else {
      console.log('something went wrong');
    }
  };
  const removeLikedSongs = async () => {
    const songId = currentSong._id;
    const payload = { songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/song/remove/likedsong",
      payload
    );
    if (response) {
      console.log('successfully remove from liked songs');
    }
    else {
      console.log('something went wrong');
    }
  };
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false)
    }
  };
  useEffect(() => {
    const getLikedSongs = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/song/get/likedsongs"
      );
      console.log(response.data);
      const check = currentSong && response.data.some(item => item._id === currentSong._id) ? true : false;
      setCheckLikeOrNot(check);
    }
    getLikedSongs();
    console.log('uouo');
  }, [currentSong])

  const nextSong = () => {
    const currentIndex = currSongList.findIndex((item) => item.track === currentSong.track);
    if (currentIndex < currSongList.length - 1) {
      const nextsong = currSongList[currentIndex + 1];
      setCurrentSong(nextsong);
    }
    return;
  }
  const prevSong = () => {
    const currentIndex = currSongList.findIndex((item) => item.track === currentSong.track);
    if (currentIndex > 0) {
      const prevsong = currSongList[currentIndex - 1];
      setCurrentSong(prevsong);
    }
    return;
  }
  const handleShuffle = () => {
    const val = shuffle;
    setShuffle(!val);
  }
  const repeatIcon = () => {
    if (repeat === 'all')
      return '/images/repeat_all.svg';
    else if (repeat === 'none')
      return '/images/repeat_none.svg';
    else return '/images/repeat_one.svg';
  }
  const handleRepeat=()=>{
    if (repeat === 'all')
    setRepeat('none');
  else if (repeat === 'none')
    setRepeat('one');
  else setRepeat('all');
  }
  const val = useRef(shuffle);

useEffect(() => {
    console.log(repeat);
    val.current = shuffle;
    console.log(val.current);

    const handleSoundEnd = () => {
        console.log('sound end');
        if (repeat === 'none') {
            setIsPaused(true);
        } else if (repeat === 'one') {
            const temp = currentSong;
            setCurrentSong(null);
            setTimeout(() => {
                setCurrentSong(temp);
            }, 100);
        } else if (val.current === false) {
            const currentIndex = currSongList.findIndex((item) => item.track === currentSong.track);
            console.log('enter non shuffle' + currentIndex)
            if (currentIndex < currSongList.length - 1) {
                const nextsong = currSongList[currentIndex + 1];
                setCurrentSong(nextsong);
            } else if (currentIndex === currSongList.length - 1) {
                setIsPaused(true);
            }
        } else if (val.current === true) {
            console.log('enter shuffle')
            let mini = 0, maxi = currSongList.length - 1;
            let newIdx = currSongList.findIndex((item) => item.track === currentSong.track), currIdx = newIdx;
            let cnt = 0; //just for hypothetical case that it's not able to find random number within our desired time complexity
            while (newIdx == currIdx || newIdx == currIdx + 1) {
                newIdx = Math.floor(Math.random() * (maxi - mini + 1) + mini),
                    cnt++;
                if (cnt == 1e5) {
                    if (currSongList.length == 2) // for song length 2 
                        newIdx = currIdx == 1 ? 0 : 1;
                    else if (currIdx + 2 < currSongList.length)
                        newIdx = currIdx + 2;
                    else
                        newIdx = 0;
                    break;
                }
            }
            const nextsong = currSongList[newIdx];
            if(newIdx!=currIdx)
            setCurrentSong(nextsong);
            else{
              const temp = currentSong;
              setCurrentSong(null);
              setTimeout(() => {
                  setCurrentSong(temp);
              }, 100);
            }
        }
    }

    soundPlayed?.on('end', handleSoundEnd);

    return () => {
        soundPlayed?.off('end', handleSoundEnd);
    };
}, [repeat, shuffle, soundPlayed]);

  return (
    <>
      <div className="h-screen w-screen" style={{ background: "linear-gradient(to bottom, #333333, #000000)" }}>
        {createPlaylistModalOpen && (
          <CreatePlaylist
            closeModal={() => {
              setCreatePlaylistModalOpen(false);
            }}
          />
        )}
        {addToPlaylistModalOpen && (
          <AddToPlaylist
            closeModal={() => {
              setAddToPlaylistModalOpen(false);
            }}
            addSongToPlaylist={addSongToPlaylist}
          />
        )}
        <div className="w-screen h-screen flex" style={{ background: 'linear-gradient(to bottom, #333333, #000000)', color: "#ECF0F1" }}>
          <div className="leftPane h-full w-1/5">
            <div className="home border-adjust mx-2 mt-2 bg-gray-950" style={{ borderRadius: '3%', padding: '7px', boxShadow: '0 0 10px  rgba(73, 71, 71, 0.7)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
              <div className="brand flex items-center gap-2">
                <span><img className="logo w-12 h-12 rounded-lg bg-white aspect-w-1 aspect-h-1" src="/images/01 logo2.jpg" alt="BeatBlaze" /></span>
                <span className="brand-name font-bold text-2xl">BeatBlaze</span>
              </div>
              <ul className="py-5 m-1.5">
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'home' ? 'text-white' : hoverTab === 'home' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { handleTabClick('home'); navigate('/'); }}
                  onMouseEnter={() => handleTabHover('home')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/home.svg" alt="home" active={activeTab === 'home' || hoverTab === 'home'} />Home
                </li>
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'search' ? 'text-white' : hoverTab === 'search' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { handleTabClick('search'); navigate('/search'); }}
                  onMouseEnter={() => handleTabHover('search')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/search.svg" alt="search" active={activeTab === 'search' || hoverTab === 'search'} />Search
                </li>
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'library' ? 'text-white' : hoverTab === 'library' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { handleTabClick('library'); navigate('/library') }}
                  onMouseEnter={() => handleTabHover('library')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/playlist.svg" alt="library" active={activeTab === 'library' || hoverTab === 'library'} />Library
                </li>
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'myMusic' ? 'text-white' : hoverTab === 'myMusic' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { handleTabClick('myMusic'); navigate('/myMusic') }}
                  onMouseEnter={() => handleTabHover('myMusic')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/myMusic.svg" alt="myMusic" active={activeTab === 'myMusic' || hoverTab === 'myMusic'} />My Music
                </li>
              </ul>
              <ul className="pt-5 m-1.5">
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'createPlaylist' ? 'text-white' : hoverTab === 'createPlaylist' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { setCreatePlaylistModalOpen(true); }}
                  onMouseEnter={() => handleTabHover('createPlaylist')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/createPlaylist.svg" alt="createPlaylist" active={createPlaylistModalOpen || hoverTab === 'createPlaylist'} />Create Playlist
                </li>
                <li
                  className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'likedSongs' ? 'text-white' : hoverTab === 'likedSongs' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => { handleTabClick('likedSongs'); navigate('/likedsongs') }}
                  onMouseEnter={() => handleTabHover('likedSongs')}
                  onMouseLeave={() => handleTabHover(null)}
                  style={{ transition: 'color 0.3s ease' }}
                >
                  <Icon src="/images/likedSongs.svg" alt="likedSongs" active={activeTab === 'likedSongs' || hoverTab === 'likedSongs'} />Liked Songs
                </li>
              </ul>
            </div>
          </div>
          <div className="rightPane h-full w-4/5">
            <div className="header border-adjust  p-2 flex justify-between rounded-lg">
              <div className="nav mt-2">
                <div className="hamburgerContainer flex items-center justify-center">
                  <img className="invert hamburger hidden h-40 w-40 cursor-pointer" src="/images/hamburger.svg" alt="" />
                  <div className="iteratorIcon flex items-center justify-center gap-3">
                    <img className="cursor-pointer" src="/images/arrowLeft.svg" alt="Go backward" />
                    <img className="cursor-pointer" src="/images/arrowRight.svg" alt="Go Forward" />
                  </div>
                </div>
              </div>
              <div className="buttons flex gap-3 mt-2" >
                <UserProfileIcon firstname={cookie.tokenForFirstName} lastname={cookie.tokenForLastName} />
              </div>

            </div>
            {children}
          </div>
        </div>
        {currentSong && (
          <div className="playbar bg-gray-950" style={{ boxShadow: '0 0 10px  rgba(73, 71, 71, 0.7)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <div className="seekbar" style={{ background: `linear-gradient(to right, white ${circlePosition}%, grey ${circlePosition}%)` }} onClick={handleSeek}>
              <div className="circle" style={{ left: `${circlePosition}%` }}></div>
            </div>
            <div className="aboveBar">
              <div className="songInfo w-1/4 flex items-center left-part gap-3">
                <img
                  src={currentSong.thumbnail}
                  className="h-14 w-14 rounded"
                  alt="currentSongThumbnail"
                />
                <div>
                  <div className="cursor-pointer hover:underline" style={{ color: "white", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {currentSong.name}
                  </div>
                  <div
                    className="text-xs cursor-pointer hover:underline"
                    style={{ color: "#c0c2c2" }}
                  >
                    {currentSong.artist.firstName + " " + currentSong.artist.lastName}
                  </div>
                </div>
              </div>
              <div className="songButtons">
                <img id="shuffle" src={shuffle ? "/images/shuffle.svg" : "/images/shuffle2.svg"} alt="shuffle" onClick={handleShuffle} />
                <img id="prev" src="/images/prevsong.svg" alt="prev" onClick={prevSong} />
                <img id="playy" src={isPaused ? "/images/play_button_bottom.svg" : "/images/pause.svg"} alt="play" onClick={() => {
                  togglePlayPuase();
                }} />
                <img id="next" src="/images/nextsong.svg" alt="next" onClick={nextSong} />
                <img id="autoPlay" src={repeatIcon()} alt="repeat_all" onClick={()=>{handleRepeat();}}/>
                <div className="volumeBar">
                  <span><img className="invert cursor-pointer relative top-1" id="volumeIcon" src={volumeIcon} alt="" onClick={() => {
                    if (volume === 0) {
                      setVolume(originalVol.current);
                      soundPlayed.volume(originalVol.current);
                      const per = Math.floor((originalVol.current - 0) / (1 - 0) * 100);
                      if (originalVol.current == 0) {
                        setVolumeIcon('/images/volume_mute.svg');
                      }
                      else if (per < 30) {
                        setVolumeIcon('/images/volume_low.svg');
                      } else if (per >= 30 && per <= 60) {
                        setVolumeIcon('/images/volume_medium.svg');
                      } else {
                        setVolumeIcon('/images/volume_high.svg');
                      }
                    }
                    else {
                      originalVol.current = volume;
                      setVolume(0);
                      soundPlayed.volume(0);
                      setVolumeIcon('/images/volume_mute.svg');
                    }
                  }
                  } /></span>
                  <span><input className="volume-slider" type="range" min="0" max="1" value={volume} step="0.01" onInput={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    const per = Math.floor((newVolume - 0) / (1 - 0) * 100);
                    if (newVolume == 0) {
                      setVolumeIcon('/images/volume_mute.svg');
                    }
                    else if (per < 30) {
                      setVolumeIcon('/images/volume_low.svg');
                    } else if (per >= 30 && per <= 60) {
                      setVolumeIcon('/images/volume_medium.svg');
                    } else {
                      setVolumeIcon('/images/volume_high.svg');
                    }
                    setVolume(newVolume);
                    soundPlayed.volume(newVolume);
                  }} style={{
                    background: `linear-gradient(to right, white ${volumePercent}%, grey ${volumePercent}%)`
                  }} /></span>
                  <span className="volume-level relative top-1">{Math.floor(volumePercent)}</span>
                </div>
              </div>
              <div className="songTime">
                {formatDuration(currSongDuration)} / {formatDuration(songDuration)}
                <div className="likeAndAddPlaylist flex gap-10">
                  <img src="/images/likedSongs.svg" className={`w-7 h-7 relative top-3 cursor-pointer ${checkLikeOrNot ? "" : "invert"}`} alt="" onClick={() => {
                    if (checkLikeOrNot) { removeLikedSongs(); setCheckLikeOrNot(false); }
                    else { addSongToLikedSongs(); setCheckLikeOrNot(true); }
                  }} />

                  <img src="/images/addPlaylist.svg" className='invert relative top-3 cursor-pointer' alt="" onClick={() => {
                    setAddToPlaylistModalOpen(true);
                  }
                  } />
                </div>
              </div>
            </div>
          </div>

        )}

      </div>
    </>
  )
}

LoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
  currActive: PropTypes.string
};

export default LoggedIn;
