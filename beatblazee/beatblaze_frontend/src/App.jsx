
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../src/routes/Login.jsx';
import SignUp from '../src/routes/SignUp.jsx'
import Home from '../src/routes/Home.jsx'
import { useCookies } from 'react-cookie';
import LoggedInHome from './routes/LoggedInHome.jsx'
import UploadSong from './routes/UploadSong.jsx'
import MyMusic from './routes/MyMusic.jsx';
import songContext from './contexts/songContext.jsx';
import { useState } from 'react';
import SearchPage from './routes/SearchPage.jsx'
import Library from './routes/Library.jsx'
import SinglePlaylistView from './routes/SinglePlaylistView.jsx';
import LikedSongsView from './routes/LikedSongsView.jsx';
function App() {
  const [cookie] = useCookies(['tokenForAuth']);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [songDuration, setSongDuration] = useState(0);
  const [currSongDuration, setCurrSongDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [circlePosition, setCirclePosition] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const [volumeIcon, setVolumeIcon] = useState('/images/volume_low.svg');
  const [checkLikeOrNot, setCheckLikeOrNot] = useState(false);
  const [currSongList,setCurrentSongList]=useState([]);
  const [repeat,setRepeat]=useState('all');
  const [shuffle,setShuffle]=useState(false);
  return (
    <>
      <div className="w-screen h-screen">{/* it tells to take whole screen width and height*/}
        <BrowserRouter>
          {cookie.tokenForAuth ? (
            <songContext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setSoundPlayed, songDuration, setSongDuration, currSongDuration, setCurrSongDuration, isPaused, setIsPaused, circlePosition, setCirclePosition, volume, setVolume, volumeIcon, setVolumeIcon,checkLikeOrNot,setCheckLikeOrNot,currSongList,setCurrentSongList,repeat,setRepeat,shuffle,setShuffle}}>{/* allows only wraps routes to access context  also instead of passing the states to each indivdual components we passed to provider only avoiding prop drilling*/}
              <Routes>{/*adding routes components indicates to package react-router-dom that we start defining routes here*/}
                <Route path='/' element={<LoggedInHome />}></Route>
                <Route path='/uploadSong' element={<UploadSong />}></Route>
                <Route path='/myMusic' element={<MyMusic />}></Route>
                <Route path='/search' element={<SearchPage />}></Route>
                <Route path='/library' element={<Library />}></Route>
                <Route path='/likedsongs' element={<LikedSongsView/>}></Route>
                <Route path="/playlist/:playlistId" element={<SinglePlaylistView />}></Route>
                <Route path='*' element={<Navigate to={'/'} />}></Route>
              </Routes>
            </songContext.Provider>
          ) :
            (<Routes>{/*adding routes components indicates to package react-router-dom that we start defining routes here*/}
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<SignUp />}></Route>
              <Route path='*' element={<Navigate to={'/'} />}></Route>
            </Routes>)}
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
