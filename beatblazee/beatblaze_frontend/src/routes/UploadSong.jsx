import { useState } from "react";
import TextInput from "../components/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import CloudinaryUpload from '../components/CloudinaryUpload.jsx';
import * as utils from '../utils/serveRoutes.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '../components/Tooltip.jsx'
import LoggedIn from "../containers/LoggedIn.jsx";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate=useNavigate();
  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await utils.makeAuthenticatedPOSTRequest(
      "/song/create",
      data
    );
    if (response.err) {
      toast.error("Could not create song");
      return;
    }
    toast.success("The song has been successfully uploaded.", {
      autoClose: 2000, // Close the notification after 3 seconds
      onClose: () => navigate('/')
    });
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} pauseOnHover={false} />
      <LoggedIn>
        <div className="content p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 mt-8">
            Upload Your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="flex items-center bg-white rounded-full p-3 w-1/3 text-black">
                <div className="flex-grow truncate">
                  {uploadedSongFileName.length > 35
                    ? uploadedSongFileName.substring(0, 35) + '...'
                    : uploadedSongFileName}
                </div>
                <Tooltip text="Reset to choose another track.">
                  <img src="/images/changeFile.svg" className="cursor-pointer h-5 w-5" onClick={() => setUploadedSongFileName('')} alt="" />
                </Tooltip>

              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>

          <div
            className="w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold hover:scale-105"
            onClick={submitSong}
            style={{ backgroundColor: "#2eccaa", color: "#fff", transition: 'all 0.3s ease' }}
          >
            Submit Song
          </div>
        </div>
      </LoggedIn>
    </>
  )
}

export default UploadSong;
