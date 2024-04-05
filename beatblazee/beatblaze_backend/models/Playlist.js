import mongoose from "mongoose";// step 1 import mongoose

// step 2 create mongoose schema. The schema defines the structure of the documents (or records) that will be stored in the MongoDB collection.

const Playlist = new mongoose.Schema({// schema function takes json file as argument
    name: {
        type: String,
        required: true,
    }, 
    thumbnail: {
        type: String,// cuz this will contain URL only
        required:true
    },
    songs: [{// signifying this is array of the type
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,// cuz artist will be user as well
        ref: "User",
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,// cuz artist will be user as well
        ref: "User",
    }]
});

// step 3  create a model.A model is a class that represents a collection in the MongoDB database. It provides an interface for querying and manipulating the data in the collection.
const PlaylistModel = mongoose.model("Playlist", Playlist);

// step 4 exporting

export default PlaylistModel;