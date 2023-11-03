import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import { AuthContextProvider } from './context/AuthContext';

function App() {
    return (
        <>
            <AuthContextProvider>
                <Navbar />
                <div className="mt-[70px] sm:mt-[65px]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Auth />} />
                    </Routes>
                </div>
            </AuthContextProvider>
        </>
    );
}

export default App;
