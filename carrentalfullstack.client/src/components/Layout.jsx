import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main style={{ marginTop: '10vh' }}>
                {children}
            </main>
        </>
    );
}
