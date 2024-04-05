import LoggedIn from "../containers/LoggedIn"
import { useState, useEffect } from 'react';
import * as utils from '../utils/serveRoutes'
import SongCard from "../components/SongCard";
import { Howl } from "howler";

const SearchPage = () => {
  const [hoverState, setHoverState] = useState(false);
  const [IsFocus, setIsFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const searchSongsDebounced = async (query) => {
    try {
      console.log(query);
      const response = await utils.makeAuthenticatedGETRequest('/song/get/songname/' + query);
      console.log(response);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchSongsDebounced(searchText);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchText]);

  const [soundPlayed, setSoundPlayed] = useState(null);
  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true
    });
    setSoundPlayed(sound);
    sound.play();
  }

  return (
    <>
      <LoggedIn currActive={'search'}>
        <div className="flex m-5 rounded-full w-1/3 items-center" style={{ backgroundColor: hoverState ? '#2D3748' : '#1A202C', border: IsFocus ? '2px solid #2D3748' : '2px solid #1A202C' }}
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}>
          <img src={hoverState || IsFocus ? "/images/search.svg" : "/images/searchGray.svg"} alt="" className="w-5 h-5 m-2" />
          <input type="text" placeholder="Discover your groove with the perfect beat..." className="p-3 rounded-full w-full focus:outline-none" style={{ backgroundColor: hoverState ? '#2D3748' : '#1A202C' }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); console.log(searchResults.length)}} />
        </div>
        {searchText.length>0?(
        <>
        <div className="text-lg px-10 py-5">Search Results ({searchResults.length})</div>
        <div className="space-y-3 pl-2 overflow-auto">
          {searchResults.map((item, index) => {
            return <SongCard key={JSON.stringify(item)} info={item} playSound={playSound} number={index + 1} />;
          })}
        </div></>):(<div></div>)}
      </LoggedIn>
    </>
  )
}


export default SearchPage
