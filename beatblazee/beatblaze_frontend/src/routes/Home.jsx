import { useState } from "react";
import Icon from '../components/Icon.jsx'
import Card from '../components/Card.jsx'
import { useNavigate } from "react-router-dom";
import LoginAndSignUpOverlay from "../modals/LoginAndSignUpOverlay.jsx";
// import { useCookies } from "react-cookie";

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoverTab, setHoverTab] = useState(null);
  // const [cookie] = useCookies(['tokenForAuth', 'tokenForUserName']);
  // const [showUserIcon, setShowUserIcon] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTabHover = (tab) => {
    setHoverTab(tab);
  };
  // if (cookie.tokenForAuth) {
  //   setShowUserIcon(true);
  // }
  // const checkForCookie=() => {
  //   console.log('enter');
  //   if(cookie.tokenForAuth)
  //   setShowUserIcon(true);
  //   return true;
  // }
  // the above commented part is part of infinite rendering.The error also occurs if we try to set a component's state immediately, without using a condition or an event handler.
  const [loginAndSignUpOverlay,setLoginAndSignUpOverlay]=useState(false);
  return (
    <>
      <div className="w-screen h-screen flex" style={{ background: "linear-gradient(to bottom, #333333, #000000)", color: '#ECF0F1' }}>
      {loginAndSignUpOverlay && (
          <LoginAndSignUpOverlay
          closeModal={() => {
            setLoginAndSignUpOverlay(false);
          }}
        />
        )}
        <div className="leftPane h-full w-1/5">
          <div className="home border-adjust mx-2 mt-2 bg-gray-950" style={{ borderRadius: '3%', padding: '7px', boxShadow: '0 0 10px  rgba(73, 71, 71, 0.7)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <div className="brand flex items-center gap-2">
              <span><img className="logo w-12 h-12 rounded-lg bg-white aspect-w-1 aspect-h-1" src="/images/01 logo2.jpg" alt="BeatBlaze" /></span>
              <span className="brand-name font-bold text-2xl">BeatBlaze</span>
            </div>
            <ul className="py-5 m-1.5">
              <li
                className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'home' ? 'text-white' : hoverTab === 'home' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => handleTabClick('home')}
                onMouseEnter={() => handleTabHover('home')}
                onMouseLeave={() => handleTabHover(null)}
                style={{ transition: 'color 0.3s ease' }}
              >
                <Icon src="/images/home.svg" alt="home" active={activeTab === 'home' || hoverTab === 'home'} />Home
              </li>
              <li
                className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'search' ? 'text-white' : hoverTab === 'search' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => { handleTabClick('search'); setLoginAndSignUpOverlay(true);}}
                onMouseEnter={() => handleTabHover('search')}
                onMouseLeave={() => handleTabHover(null)}
                style={{ transition: 'color 0.3s ease' }}
              >
                <Icon src="/images/search.svg" alt="search" active={activeTab === 'search' || hoverTab === 'search'} />Search
              </li>
              <li
                className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'library' ? 'text-white' : hoverTab === 'library' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => {handleTabClick('library');setLoginAndSignUpOverlay(true);}}
                onMouseEnter={() => handleTabHover('library')}
                onMouseLeave={() => handleTabHover(null)}
                style={{ transition: 'color 0.3s ease' }}
              >
                <Icon src="/images/playlist.svg" alt="library" active={activeTab === 'library' || hoverTab === 'library'} />Library
              </li>
            </ul>
            <ul className="pt-5 m-1.5">
              <li
                className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'createPlaylist' ? 'text-white' : hoverTab === 'createPlaylist' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => {handleTabClick('createPlaylist');setLoginAndSignUpOverlay(true);}}
                onMouseEnter={() => handleTabHover('createPlaylist')}
                onMouseLeave={() => handleTabHover(null)}
                style={{ transition: 'color 0.3s ease' }}
              >
                <Icon src="/images/createPlaylist.svg" alt="createPlaylist" active={activeTab === 'createPlaylist' || hoverTab === 'createPlaylist'} />Create Playlist
              </li>
              <li
                className={`w-auto flex gap-3 items-center cursor-pointer py-4 ${activeTab === 'likedSongs' ? 'text-white' : hoverTab === 'likedSongs' ? 'text-white' : 'text-gray-400'}`}
                onClick={() => {handleTabClick('likedSongs');setLoginAndSignUpOverlay(true);}}
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
            <div className="buttons flex gap-3" >

              <button
                className="signupbtn py-2 px-4 text-lg rounded-3xl bg-gray-900 hover:scale-105 cursor-pointer"
                style={{color: "#ECF0F1", transition: 'all 0.3s ease' }}
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
              <button
                className="loginbtn py-2 px-4 text-lg rounded-3xl bg-gray-100 hover:scale-105 cursor-pointer"
                style={{ color: "black", transition: 'all 0.3s ease' }}
                onClick={() => navigate('/login')}
              >
                Login
              </button>

            </div>

          </div>
          <div className="beatblazePlaylists p-4">
            <h1 className="text-2xl">BeatBlaze Playlists</h1>
            <div className="cardContainer m-8 flex gap-2.5 flex-wrap overflow-y-auto" style={{ maxHeight: '65vh' }}>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/hip_hop.png" name="Hip Hop" desc="Dive into raw hip-hop vibes – where beats speak and rhymes tell stories.
                  🎤🔥"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/jazz (1).png" name="Jazz" desc="Explore soulful notes, where melodies tell tales, and improvisation
                weaves musical magic. 🎵✨"></Card>
              <Card
                source1="/images/play_button.svg" source2="/images/phonk.png" name="Phonk" desc="Unleashing aggressive beats and gritty lo-fi vibes in a raw, atmospheric sonic journey.😈🔥"></Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
