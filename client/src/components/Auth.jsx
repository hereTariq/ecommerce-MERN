import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuthContext();
    const [isLogin, setIsLogin] = useState(true);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const changeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (!values.email || !values.password) {
                return alert('email and password are required');
            }
            // setIsLogin(true);
            setIsLoggedIn(true);
            navigate('/');
        } else {
            if (
                !values.name ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
            ) {
                return alert('all the fields are required');
            }
            console.log(values);
        }
    };

    return (
        <div className="flex mt-[37%] sm:mt-[20%] md:mt-[10%] flex-col justify-center items-center mx-auto sm:w-[600px]">
            <h1 className="font-bold text-2xl">
                {isLogin ? 'Login' : 'SignUp'}
            </h1>
            <form className="w-[90%] mx-auto mt-[30px]" onSubmit={handleSubmit}>
                <div className={`mb-6 ${isLogin && 'hidden'}`}>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="john doe"
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="example@gmail.com"
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <div className={`mb-6 ${isLogin && 'hidden'}`}>
                    <label
                        htmlFor="repeat-password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Repeat password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="repeat-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        onChange={(e) => changeHandler(e)}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        {isLogin ? 'Login' : 'Register new account'}
                    </button>
                    <p>
                        {isLogin ? 'New member? ' : 'Old member? '}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-link cursor-pointer text-amber-950 hover:underline"
                        >
                            {isLogin ? ' SignUp' : ' Login'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Auth;
