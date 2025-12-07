import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
