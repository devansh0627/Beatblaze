import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serveRoutes.jsx";
import PropTypes from 'prop-types';


const AddToPlaylist = ({ closeModal, addSongToPlaylist }) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-10"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Select Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    {myPlaylists.map((item) => {
                        return (
                            <PlaylistListComponent
                                key={JSON.stringify(item)}
                                info={item}
                                addSongToPlaylist={addSongToPlaylist}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="w-full flex items-center space-x-4 cursor-pointer p-3" onClick={() => {
            addSongToPlaylist(info._id)
        }}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }} style={{
                transition: "all 0.3s",
                backgroundColor: isHovered ? "#1F2937" : "#111827",
            }}>
            <div>
                <img
                    src={info.thumbnail === '404' ? '/images/customPlaylist.svg' : info.thumbnail}
                    className="w-10 h-10 rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-white font-semibold text-sm">{info.name}</div>
        </div>
    );
};

AddToPlaylist.propTypes = {
    closeModal: PropTypes.func.isRequired,
    addSongToPlaylist: PropTypes.func.isRequired,
};

PlaylistListComponent.propTypes = {
    info: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    addSongToPlaylist: PropTypes.func.isRequired,
};
export default AddToPlaylist;
