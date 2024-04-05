          <div
            className="w-full h-1/10 flex items-center px-2 py-2 gap-3"
            style={{
              border: "solid #2C3E50",
              backgroundColor: "#364c61",
            }}
          >
            <div className="seekbar bg-white rounded-lg absolute bottom-0 cursor-pointer" style={{ background: 'linear-gradient(to right, white 26.6612%, grey 26.6612%)',height:'2px',width:'98%' }}>
                <div className="circle w-2 h-2 rounded-full bg-white border-2 border-black absolute bottom-0 left-0 transition-left duration-500" style={{ left: '26.6612%' , bottom:'-2px'}}>
                </div>
              </div>
            <div className="w-1/4 flex items-center left-part gap-3">
              <img
                src={currentSong.thumbnail}
                className="h-14 w-14 rounded"
                alt="currentSongThumbnail"
              />
              <div>
                <div className="cursor-pointer hover:underline" style={{ color: "white" }}>
                  {currentSong.name}
                </div>
                <div
                  className="text-xs cursor-pointer hover:underline"
                  style={{ color: "#c0c2c2" }}
                >
                  {currentSong.artist.firstName + " " + currentSong.artist.lastName}
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center h-full">
              <div className="songButtons flex h-1/2 pt-2 gap-5 items-center">
                {/* controls for current song playing */}
                <img
                  id="shuffle"
                  src="/images/shuffle2.svg"
                  alt="shuffle"
                  className="h-5 w-5 cursor-pointer"
                />
                <img
                  id="prev"
                  src="/images/prevsong.svg"
                  alt="prev"
                  className="h-5 w-5 cursor-pointer"
                />
                <img
                  id="playy"
                  src={isPaused ? "/images/play_button_bottom.svg" : "/images/pause.svg"}
                  alt="play"
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => {
                    togglePlayPuase();
                  }}
                />
                <img
                  id="next"
                  src="/images/nextsong.svg"
                  alt="next"
                  className="h-5 w-5 cursor-pointer"
                />
                <img
                  id="autoPlay"
                  src="/images/repeat_all.svg"
                  alt="repeat_all"
                  className="h-5 w-5 cursor-pointer"
                />
              </div>
            </div>
            <div className="w-1/4 flex justify-end text-white">
              {formatDuration(currSongDuration)} / {formatDuration(songDuration)}
            </div>
          </div>