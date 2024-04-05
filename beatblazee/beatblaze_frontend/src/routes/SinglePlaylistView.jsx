import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import LoggedIn from "../containers/LoggedIn.jsx";
import { makeAuthenticatedGETRequest } from "../utils/serveRoutes.jsx";
import SongCard from "../components/SongCard.jsx";
import songContext from "../contexts/songContext.jsx";
const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState({});
    const { playlistId } = useParams();
    const {currSongList,setCurrentSongList}=useContext(songContext);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist/" + playlistId
            );
            setPlaylistDetails(response);
            setCurrentSongList(response.songs);
            console.log(response);
        };
        getData();
    }, []);

    return (
        <LoggedIn currActive={"library"}>
            {playlistDetails._id && (
                <div>
                    <div className="text-white text-xl font-semibold pb-4 pl-4 pt-8">
                        {playlistDetails.name}
                    </div>
                    <div className="text-white text-md font-semibold pb-4 pl-4 pt-8">
                    {playlistDetails.songs.length==1?'1 song':`${playlistDetails.songs.length} songs`} 
                    </div>
                    <div className="space-y-3 pl-2 overflow-auto">
                        {playlistDetails.songs.map((item, index) => {
                            return <SongCard key={JSON.stringify(item)} info={item} playSound={() => {}} number={index + 1} />;
                        })}
                    </div>
                </div>
            )}
        </LoggedIn>
    );
};

export default SinglePlaylistView;