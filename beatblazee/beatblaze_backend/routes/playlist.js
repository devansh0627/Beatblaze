import express from "express";
import passport from "passport";
import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import Song from "../models/Song.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const currentUser = req.user;
        const { name, thumbnail, songs } = req.body;
        if (!name || !songs) {
            return res.status(301).json({ err: "Insufficient data" });
        }
        const playlistData = {
            name,
            songs,
            owner: currentUser._id,
            collaborators: [],
        };
        if (thumbnail) {
            playlistData.thumbnail = thumbnail;
        }
        else{
            playlistData.thumbnail='404';
        }
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
);

router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const playlistId = req.params.playlistId;
        if (!ObjectId.isValid(playlistId)) {
            return res.status(400).json({ message: "Invalid playlistsId" });
        }
        const playlist = await Playlist.findOne({_id: playlistId}).populate({
            path:'songs',
            populate:{
                path:'artist'
            }
        })
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);

router.get(
    "/get/me",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.user._id;
        const playlists = await Playlist.find({owner: artistId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    }
);

router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.params.artistId;
        const artist = await User.findOne({_id: artistId});
        if (!artist) {
            return res.status(304).json({err: "Invalid Artist ID"});
        }
        const playlists = await Playlist.find({owner: artistId});
        return res.status(200).json({data: playlists});
    }
);

router.post(
    "/add/song",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {playlistId, songId} = req.body;
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(304).json({err: "Playlist does not exist"});
        }
        if (
            !playlist.owner.equals(currentUser._id) &&
            !playlist.collaborators.includes(currentUser._id)
        ) {
            return res.status(400).json({err: "Not allowed"});// cuz if curr playlist owner is not curr user as well curr user is not even collaborator
        }
        const song = await Song.findOne({_id: songId});
        if (!song) {
            return res.status(304).json({err: "Song does not exist"});
        }
        playlist.songs.push(songId);
        await playlist.save();
        return res.status(200).json(playlist);
    }
);

export default router;
