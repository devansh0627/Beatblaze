import TextInput from '../components/TextInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as utils from '../utils/serveRoutes.jsx'
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [cookie, setCookie] = useCookies(['tokenForAuth', 'tokenForFirstName', 'tokenForLastName']);
    const navigate = useNavigate();
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
        if (value.length != 0 && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
        if (confirmEmail.length != 0 && value !== confirmEmail) {
            setConfirmEmailError('Email addresses do not match');
        } else {
            setConfirmEmailError('');
        }
    }

    const handleConfirmEmailChange = (value) => {
        setConfirmEmail(value);
        if (value.length != 0 && value !== email) {
            setConfirmEmailError('Email addresses do not match');
        } else {
            setConfirmEmailError('');
        }
    }

    const signUpDetails = async () => {
        const data = { email, password, userName, firstName, lastName };// these fields will pass to backend so make sure this naming remains same while fetching 
        const res = await utils.makeUnauthenticatedPOSTRequest('/auth/register', data);
        if (res.data && res.status != 400 && res.data.error) {
            setEmailError(res.data.error);
        }
        else if (res.status == 400) {
            setConfirmEmailError('');
            setEmailError('');
            setUserNameError(res.data.error);
        }
        else {
            const token = res.data.token;
            const date = new Date();
            // Display success toast message
            toast.success("Sign up successful! Welcome to BeatBlaze!", {
                autoClose: 1500,
                onClose: () => {
                    date.setDate(date.getDate() + 30);
                    setCookie("tokenForAuth", token, { path: "/", expires: date });
                    setCookie("tokenForFirstName", res.firstName, { path: "/", expires: date });
                    setCookie("tokenForLastName", res.lastName, { path: "/", expires: date }); navigate('/')
                }
            });
        }
    }
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });
    return (
        <>
            <ToastContainer position="top-center" autoClose={1500} pauseOnHover={false} />
            {isDesktopOrLaptop ? (<div className="flex flex-col items-center text-white" style={{ background: "linear-gradient(to bottom, #333333, #000000)" }}>
                <div className="brand flex items-center gap-2 p-5 border-b w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="BeatBlaze" /></span>
                    <span className="brand-name text-2xl font-bold">BeatBlaze</span>
                </div>
                <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                    <div className="font-bold mb-4 text-2xl text-center text-pretty">
                        Sign up and ignite your musical journey with BeatBlaze!
                    </div>
                    <div className='w-full flex flex-col pb-5'>
                        <TextInput
                            label="What's your email?"
                            placeholder="Enter your email."
                            className="my-6"
                            value={email}
                            setValue={handleEmailChange}
                        />
                        {emailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{emailError}</div>}
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <TextInput
                            label="Confirm your email"
                            placeholder="Enter your email again."
                            className="mb-6"
                            value={confirmEmail}
                            setValue={handleConfirmEmailChange}
                        />
                        {confirmEmailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmEmailError}</div>}
                    </div>
                    <PasswordInput
                        label="Create a password"
                        placeholder="Create a password"
                        value={password}
                        setValue={setPassword}
                    />
                    <div className='flex w-full justify-between items-center gap-8'>
                        <TextInput
                            label="First Name"
                            placeholder="Enter your First Name"
                            className="my-6"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your Last Name"
                            className="my-6"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <TextInput
                            label="Choose your username"
                            placeholder="Enter your username"
                            className="my-6"
                            value={userName}
                            setValue={setUserName}
                        />
                        {userNameError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{userNameError}</div>}
                    </div>
                    <div className=" w-full flex items-center justify-center my-8">
                        <button
                            className="font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105"
                            style={{ backgroundColor: "#008080", color: "white" }}
                            onClick={(e) => {
                                e.preventDefault();// prevent default functioning if there to get called 
                                signUpDetails();
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Already have an account?
                    </div>
                    <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                        <Link
                            to="/login"
                            className="transition-transform transform-gpu hover:scale-105"
                            style={{ color: '#00cccc' }}
                        >
                            LOGIN IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>) : (<div className="flex flex-col items-center text-white" style={{ background: "linear-gradient(to bottom, #333333, #000000)" }}>
                <div className="brand flex items-center gap-2 p-5 border-b w-full justify-center border-solid">
                    <span><img className="w-12 h-12 rounded-lg bg-white border border-black" src="/images/01 logo2.jpg" alt="BeatBlaze" /></span>
                    <span className="brand-name text-2xl font-bold">BeatBlaze</span>
                </div>
                <div className="inputRegion w-full py-10 flex items-center justify-center flex-col">
                    <div className="font-bold mb-4 text-2xl text-center text-pretty">
                        Sign up and ignite your musical journey with BeatBlaze!
                    </div>
                    <div className='w-full px-2 flex flex-col pb-5'>
                        <TextInput
                            label="What's your email?"
                            placeholder="Enter your email."
                            className="my-6"
                            value={email}
                            setValue={handleEmailChange}
                        />
                        {emailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{emailError}</div>}
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <TextInput
                            label="Confirm your email"
                            placeholder="Enter your email again."
                            className="mb-6"
                            value={confirmEmail}
                            setValue={handleConfirmEmailChange}
                        />
                        {confirmEmailError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{confirmEmailError}</div>}
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <PasswordInput
                            label="Create a password"
                            placeholder="Create a password"
                            value={password}
                            setValue={setPassword}
                        />
                    </div>
                    <div className='flex w-full px-2 justify-between items-center flex-wrap gap-2'>
                        <TextInput
                            label="First Name"
                            placeholder="Enter your First Name"
                            className="my-6"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your Last Name"
                            className="my-6"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>
                    <div className="w-full flex px-2 flex-col pb-5">
                        <TextInput
                            label="Choose your username"
                            placeholder="Enter your username"
                            className="my-6"
                            value={userName}
                            setValue={setUserName}
                        />
                        {userNameError && <div className="flex items-center text-red-500 text-sm"><img className='h-5 w-5' src="/images/error.svg" alt="error" />{userNameError}</div>}
                    </div>
                    <div className=" w-full flex items-center justify-center my-8">
                        <button
                            className="font-semibold p-3 px-10 rounded-full transition-transform transform-gpu hover:scale-105"
                            style={{ backgroundColor: "#008080", color: "white" }}
                            onClick={(e) => {
                                e.preventDefault();// prevent default functioning if there to get called 
                                signUpDetails();
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="w-full border border-solid border-gray-300"></div>
                    <div className="my-6 font-semibold text-lg">
                        Already have an account?
                    </div>
                    <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                        <Link
                            to="/login"
                            className="transition-transform transform-gpu hover:scale-105"
                            style={{ color: '#00cccc' }}
                        >
                            LOGIN IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default SignUp;
