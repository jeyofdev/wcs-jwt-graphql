import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Auth from '../components/Auth';
import Home from '../components/Home';
import Login from '../components/Login';
import Logout from '../components/Logout';
import ProtectedArea from '../components/ProtectedArea';
import Register from '../components/Register';
import AddBook from '../components/AddBook';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route
                        index
                        element={
                            <ProtectedArea>
                                <Home />
                            </ProtectedArea>
                        }
                    />
                    <Route
                        path="/add-book"
                        element={
                            <ProtectedArea>
                                <AddBook />
                            </ProtectedArea>
                        }
                    />
                    <Route path="auth" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Route>
                <Route path="logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
