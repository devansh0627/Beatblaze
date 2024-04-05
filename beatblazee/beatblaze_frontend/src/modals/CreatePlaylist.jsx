import {useState} from "react";
import TextInput from '../components/TextInput.jsx'
import {makeAuthenticatedPOSTRequest} from '../utils/serveRoutes.jsx';
import PropTypes from 'prop-types';

const CreatePlaylist = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            {name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
        else{
            console.log(response);
        }
    };

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
                    Create Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelClassName={"text-white"}
                        inputBg={'#CCCCCC'}
                        placeholder="Playlist Name"
                        value={playlistName}
                        setValue={setPlaylistName}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelClassName={"text-white"}
                        inputBg={'#CCCCCC'}
                        placeholder="Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    />
                    <div
                        className="bg-gray-400 text-gray-800 w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer hover:scale-105"
                        onClick={createPlaylist}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
};

CreatePlaylist.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default CreatePlaylist;