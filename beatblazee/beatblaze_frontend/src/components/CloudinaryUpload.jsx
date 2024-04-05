import PropTypes from 'prop-types';
import { openUploadWidget } from '../utils/cloudinaryService.jsx';
import { cloudinary_upload_preset } from '../config.jsx';

const CloudinaryUpload = ({ setUrl, setName }) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dokd7lp11",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"], //allowing upload from local system only
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black  rounded-full p-4 font-semibold hover:scale-105"
            onClick={uploadImageWidget}
            style={{ transition: 'all 0.3s ease' }}
        >
            Select Track
        </button>
    );
};

CloudinaryUpload.propTypes = {
    setUrl: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired
};

export default CloudinaryUpload;
