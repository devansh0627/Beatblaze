import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import songContext from "../contexts/songContext.jsx";
import { getCloudinaryAudioDuration } from '../utils/durationOfSong.jsx';

const SongCard = ({ info, playSound, number }) => {
    const { currentSong, setCurrentSong } = useContext(songContext); // useContext hook in react
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const fetchDuration = async () => {
            try {
                const duration = await getCloudinaryAudioDuration(info.track);
                setDuration(duration);
            } catch (error) {
                console.error('Error fetching duration:', error);
            }
        };

        fetchDuration();
    }, [info.track]);
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
    return (
        <div
            className="flex p-2 rounded-sm cursor-pointer gap-2 items-center bg-gray-900 hover:bg-gray-800"
            style={{
                borderRadius: "0.25rem",
                transition: "all 0.3s",
            }}
            onClick={() => {
                setCurrentSong(info);
            }}
        >
            <div className="text-gray-400 text-sm mr-2">{number}</div>
            <div
                className="w-12 h-12 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${info.thumbnail}")`,
                }}
            ></div>
            <div className="flex w-full">
                <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">{info.name}</div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {info.artist.firstName + " " + info.artist.lastName}
                    </div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>{duration !== null ? `${formatDuration(duration)}` : 'Loading...'}</div>
                </div>
            </div>
        </div>
    );
};

SongCard.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        track: PropTypes.string.isRequired,
        artist: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    playSound: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
};

export default SongCard;
