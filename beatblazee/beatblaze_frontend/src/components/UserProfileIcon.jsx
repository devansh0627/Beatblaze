import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import songContext from '../contexts/songContext';
const UserProfileIcon = ({ firstname, lastname }) => {
    // DiceBear Avatar API URL
    const [initial1] = useState((firstname && firstname !== 'undefined') ? firstname.charAt(0).toUpperCase() : '');
    const [initial2] = useState((lastname && lastname !== 'undefined') ? lastname.charAt(0).toUpperCase() : '');
    const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, songDuration, setSongDuration, currSongDuration, setCurrSongDuration, isPaused, setIsPaused, circlePosition, setCirclePosition, volume, setVolume, volumeIcon, setVolumeIcon, checkLikeOrNot, setCheckLikeOrNot, currSongList, setCurrentSongList, repeat, setRepeat, shuffle, setShuffle } = useContext(songContext);
    const apiUrl = `https://api.dicebear.com/5.x/initials/svg?backgroundColor=2d3748&seed=${initial1}${initial2}
    `;
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);
    const iconRef = useRef(null);
    const [hoverList, setHoverList] = useState(null);
    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleTabHover = (tab) => {
        setHoverList(tab);
    };
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            iconRef.current &&
            !iconRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const [cookies, setCookie, removeCookie] = useCookies(['tokenForAuth', 'tokenForFirstName', 'tokenForLastName']);
    const handleLogout = () => {
        // Remove the authentication token cookie
        soundPlayed.stop();
        toast.success("Logout Successful! See you soon!", {
            autoClose: 1500,
            onClose: () => {
                removeCookie('tokenForAuth');
                removeCookie('tokenForFirstName');
                removeCookie('tokenForLastName');
                setCurrentSong(null);
                setSoundPlayed(null);
                setSongDuration(0);
                setCurrSongDuration(0);
                setIsPaused(null);
                setCirclePosition(0);
                setVolume(0.25);
                setVolumeIcon('/images/volume_low.svg');
                setCheckLikeOrNot(false);
                setCurrentSongList([]);
                setRepeat('all');
                setShuffle(false);
                navigate('/');
            }
        });
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            <div className="relative flex gap-3">
                {cookies.tokenForAuth ? (
                    <>
                        <button className="font-bold py-2 px-4 rounded-full hover:scale-105 mr-2 bg-gray-900" style={{ color: "#ECF0F1", transition: 'font-size 0.2s ease, transform 0.2s ease' }} onClick={() => navigate('/uploadSong')}>
                            Upload Song
                        </button>

                        <img
                            src={apiUrl}
                            alt={`Avatar for ${firstname}`}
                            className="w-10 h-10 rounded-full cursor-pointer hover:scale-105"
                            onClick={handleToggleMenu}
                            ref={iconRef}
                            style={{ border: '3px solid black' }}
                        />
                        {showMenu && (
                            <div ref={dropdownRef} className="absolute top-full z-10 right-0 mt-5 w-48 rounded-lg shadow-lg" style={{ backgroundColor: '#111827' }}>
                                <ul className="py-1">
                                    <li className="px-4 py-2 cursor-pointer rounded" onMouseEnter={() => { handleTabHover('Profile') }} onMouseLeave={() => { handleTabHover(null) }}
                                        style={{ backgroundColor: hoverList === 'Profile' ? "#1F2937" : "#111827", transition: 'all 0.3s ease' }}>Profile</li>
                                    <li className="px-4 py-2 cursor-pointer rounded" onMouseEnter={() => { handleTabHover('Settings') }} onMouseLeave={() => { handleTabHover(null) }} style={{ backgroundColor: hoverList === 'Settings' ? "#1F2937" : "#111827", transition: 'all 0.3s ease' }}>Settings</li>
                                    <li className="px-4 py-2 cursor-pointer rounded" onMouseEnter={() => { handleTabHover('Logout') }} onMouseLeave={() => { handleTabHover(null) }} onClick={() => { handleLogout(); }} style={{ backgroundColor: hoverList === 'Logout' ? "#1F2937" : "#111827", transition: 'all 0.3s ease' }}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (<> <button
                    className="signupbtn py-3 px-6 text-lg rounded-3xl bg-gray-900 hover:scale-105 cursor-pointer"
                    style={{ color: "#ECF0F1", transition: 'all 0.3s ease' }}
                    onClick={() => navigate('/signup')}
                >
                    Sign up
                </button>
                    <button
                        className="loginbtn py-3 px-6 text-lg rounded-3xl bg-gray-100 hover:scale-105 cursor-pointer"
                        style={{ color: "black", transition: 'all 0.3s ease' }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button></>)}
            </div>
        </>
    );
};

UserProfileIcon.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string
};

export default UserProfileIcon;
