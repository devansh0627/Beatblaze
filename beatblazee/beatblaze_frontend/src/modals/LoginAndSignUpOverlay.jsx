import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
const LoginAndSignUpOverlay = ({ closeModal }) => {
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1024 });
    return (
        <>
            {isDesktopOrLaptop ? (<div className="absolute bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-10" onClick={closeModal}>
                <div className="flex gap-20 w-1/2 h-1/2 rounded-xl" style={{ background: "linear-gradient(to bottom, #333333, #000000)" }} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <div className="p-10">
                        <img src="/images/defautMusic.svg" alt="" className="w-100 h-100 bg-gray-800 rounded-xl" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="initials text-xl p-10 text-center">
                            Start discovering new music with a free BeatBlaze account!
                        </div>
                        <button
                            className="signupbtn py-3 px-10 rounded-3xl bg-gray-700 hover:scale-105 cursor-pointer"
                            style={{ color: "#ECF0F1", transition: 'all 0.3s ease' }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign up free
                        </button>
                        <div className='flex mt-10'>
                            <div className='text-gray-400 relative right-6'>Already have an account?</div>
                            <div className='hover:underline cursor-pointer' onClick={() => navigate('/login')}>Login</div>
                        </div>
                    </div>
                </div>
                <div className="absolute py-4 px-8 cursor-pointer text-gray-500 hover:text-white hover:scale-105 bg-black bg-opacity-20 flex justify-center items-center z-10 bottom-20" onClick={closeModal}>
                    Close
                </div>
            </div>) : (<div className="absolute bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-10" onClick={closeModal}>
                <div className="flex flex-col gap-2 w-auto h-auto rounded-xl" style={{ background: "linear-gradient(to bottom, #333333, #000000)" }} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <div className="pt-5 flex flex-col items-center justify-center">
                        <img src="/images/defautMusic.svg" alt="" className="w-24 h-24 bg-gray-800 rounded-xl" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="initials text-xl p-5 text-center">
                            Start discovering new music with a free BeatBlaze account!
                        </div>
                        <button
                            className="signupbtn py-3 px-6 rounded-3xl bg-gray-700 hover:scale-105 cursor-pointer"
                            style={{ color: "#ECF0F1", transition: 'all 0.3s ease' }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign up free
                        </button>
                        <div className='flex mt-5 pb-5'>
                            <div className='text-gray-400 relative right-6'>Already have an account?</div>
                            <div className='hover:underline cursor-pointer' onClick={() => navigate('/login')}>Login</div>
                        </div>
                    </div>
                </div>
                <div className="absolute py-4 px-8 cursor-pointer text-gray-500 hover:text-white hover:scale-105 bg-black bg-opacity-20 flex justify-center items-center z-10 bottom-20" onClick={closeModal}>
                    Close
                </div>
            </div>
            )}
        </>
    )
}

LoginAndSignUpOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default LoginAndSignUpOverlay;
