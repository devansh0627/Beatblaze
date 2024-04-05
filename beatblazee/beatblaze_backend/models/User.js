import mongoose from "mongoose";// step 1 import mongoose

// step 2 create mongoose schema. The schema defines the structure of the documents (or records) that will be stored in the MongoDB collection.

const User = new mongoose.Schema({// schema function takes json file as argument
    firstName: {
        type: String,
        required: true, // this tells firstname is compulsory field for user to fill in 
    },
    lastName: {
        type: String,
        required: false, // tho by default it's false only 
    },
    email: {
        type: String,
        required: true,
    },
    hashPassword: { 
        type: String,
        required: true,
    },
    likedSongs: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    likedPlaylists: {
        type: Object,
        default: {},
    },
    suscribedArtists: {
        type: Object,
        default: {},
    },
    userName: {
        type: String,
        required: true,
    },
});

// step 3  create a model.A model is a class that represents a collection in the MongoDB database. It provides an interface for querying and manipulating the data in the collection.
const UserModel = mongoose.model("User", User);

// step 4 exporting

export default UserModel;