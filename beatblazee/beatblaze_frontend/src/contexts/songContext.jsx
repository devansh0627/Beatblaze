import { createContext } from "react";// may use redux as well 

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => { },
    soundPlayed: null,
    setSoundPlayed: () => { },
    songDuration: 0,
    setSongDuration: ()=>{ },
    currSongDuration: 0,
    setCurrSongDuration: ()=>{ },
    isPaused: null,
    setIsPaused: () => { },
    circlePosition:0,
    setCirclePosition:()=>{},
    volume:0.25,
    setVolume:()=>{},
    volumeIcon:'/images/volume_low.svg', 
    setVolumeIcon:()=>{},
    checkLikeOrNot:false,
    setCheckLikeOrNot:()=>{},
    currSongList:[],
    setCurrentSongList:()=>{},
    repeat:'all',
    setRepeat:()=>{},
    shuffle:false,
    setShuffle:()=>{}
});

export default songContext;