import { useState, useEffect,useContext } from "react";
import * as utils from '../utils/serveRoutes.jsx'
import 'react-toastify/dist/ReactToastify.css';
import SongCard from "../components/SongCard.jsx";
import { Howl } from "howler";
import LoggedIn from "../containers/LoggedIn.jsx";
import songContext from "../contexts/songContext.jsx";
const MyMusic = () => {

    const [songData, setSongData] = useState([]);
    const {currSongList,setCurrentSongList}=useContext(songContext);
    useEffect(() => {
        const getData = async () => {
            const response = await utils.makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            console.log(response.data);
            setSongData(response.data);
            setCurrentSongList(response.data);
        };
        getData();
    }, []);

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
            <LoggedIn currActive="myMusic">
                <div className="text-white text-xl font-semibold pb-4 pl-4 pt-8">
                    My Songs
                </div>
                <div className="space-y-3 pl-2 overflow-auto">
                    {songData.map((item, index) => {
                        return <SongCard key={JSON.stringify(item)} info={item} playSound={playSound} number={index + 1} />;
                    })}
                </div>
            </LoggedIn>

        </>
    );
};

export default MyMusic;