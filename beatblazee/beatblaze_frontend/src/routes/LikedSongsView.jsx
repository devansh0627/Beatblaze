import { useEffect, useState,useContext } from "react";
import LoggedIn from "../containers/LoggedIn.jsx";
import { makeAuthenticatedGETRequest } from "../utils/serveRoutes.jsx";
import SongCard from "../components/SongCard.jsx";
import songContext from "../contexts/songContext.jsx";
const LikedSongsView = () => {
    const [likedSongs,setLikedSongs]=useState([]);
    const {currSongList,setCurrentSongList}=useContext(songContext);
    useEffect(() => {
         const getLikedSongs = async () => {
            const response = await makeAuthenticatedGETRequest(
              "/song/get/likedsongs"
            );
            setLikedSongs(response.data);
            setCurrentSongList(response.data);
            console.log(likedSongs);
          }
        getLikedSongs();
    }, []);

    return (
        <LoggedIn currActive={"likedSongs"}>
            {likedSongs.length>0 && (
                <div>
                    <div className="text-white text-xl font-semibold pb-4 pl-4 pt-8">
                        Liked Songs
                    </div>
                    <div className="text-white text-md font-semibold pb-4 pl-4 pt-8">
                    {likedSongs.length==1?'1 song':`${likedSongs.length} songs`} 
                    </div>
                    <div className="space-y-3 pl-2 overflow-auto">
                        {likedSongs.map((item, index) => {
                            return <SongCard key={JSON.stringify(item)} info={item} playSound={() => {}} number={index + 1} />;
                        })}
                    </div>
                </div>
            )}
        </LoggedIn>
    );
};

export default LikedSongsView;