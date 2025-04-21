import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main style={{ marginTop: '0' }}>
                {children}
            </main>
        </>
    );
}
