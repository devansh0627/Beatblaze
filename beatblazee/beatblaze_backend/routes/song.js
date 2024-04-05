import express from "express";
import passport from "passport";
import Song from "../models/Song.js";
import User from "../models/User.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // req.user getss the user because of passport.authenticate
        const {name, thumbnail, track} = req.body;
        if (!name || !thumbnail || !track) {
            return res
                .status(301)
                .json({err: "Insufficient details to create song."});
        }
        const artist = req.user._id;
        
        const songDetails = {name, thumbnail, track, artist};
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
    }
);

// Get route to get all songs I have published.
router.get(
    "/get/mysongs",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // We need to get all songs where artist id == currentUser._id
        const songs = await Song.find({artist: req.user._id}).populate(
            "artist"
        );
        return res.status(200).json({data: songs});
    }
);

// Get route to all songs that curr user liked 
router.get(
    "/get/likedsongs",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const likedSongs = user.likedSongs;
            // Assuming likedSongs is an array of song IDs
            const songs = await Song.find({ _id: { $in: likedSongs } }).populate("artist");
            return res.status(200).json({ data: songs });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);
router.post(
    "/add/likedsong",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {songId} = req.body;
        const currSong = await Song.findOne({_id: songId});
        if (!currSong) {
            return res.status(304).json({err: "Song does not exist"});
        }
        currentUser.likedSongs.push(songId);
        await currentUser.save();
        
        return res.status(200).json(currSong);
    }
);
router.post(
    "/remove/likedsong",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {songId} = req.body;
        const currSong = await Song.findOne({_id: songId});
        if (!currSong) {
            return res.status(304).json({err: "Song does not exist"});
        }
        // Remove the songId from the currentUser's likedSongs array
        const index = currentUser.likedSongs.indexOf(songId);
        if (index !== -1) {
            currentUser.likedSongs.splice(index, 1);
        } else {
            return res.status(404).json({err: "Song not found in liked songs"});
        }

        await currentUser.save();
        
        return res.status(200).json({message: "Song removed from liked songs"});
    }
);

// Get route to get all songs any artist has published
// I will send the artist id and I want to see all songs that artist has published.
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // also it's encouraged that req.body should be empty in get req
        // We can check if the artist does not exist
        const artistId = req.params.artistId;// u can also use destructuring like const {artistId}=req.params as it will as key but this is better way cuz maybe we use further /:/: like this.
        if (!ObjectId.isValid(artistId)) {// this method is build in to check whether id is of correct format if this check isn't included then server might crash if the format is wrong cuz like before suppose artist id is to be of 12 bytes but it came as <12 or >12 
            return res.status(400).json({ message: "Invalid artistID" });
        }
        const artist = await User.findOne({_id: artistId});
        if (!artist) {
            return res.status(301).json({err: "Artist does not exist"});
        }

        const songs = await Song.find({artist: artistId});
        return res.status(200).json({data: songs});
    }
);

// Get route to get a single song by name
router.get(
    "/get/songname/:songName",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const {songName} = req.params;

        // Use a regular expression for pattern matching
        const regex = new RegExp(songName, "i"); // "i" flag for case-insensitive matching

        const songs = await Song.find({name: {$regex: regex}}).populate("artist");
        return res.status(200).json({data: songs});
    }
);



export default router;
