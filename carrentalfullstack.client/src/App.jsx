import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { CarBookingPage } from './pages/CarBookingPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { Layout } from './components/Layout';
import { AvailableCarsPage } from './pages/AvailableCarsPage';
import { RentalDetailsPage } from './pages/RentalDetailsPage';
import { RentalsPage } from './pages/RentalsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/book" element={<CarBookingPage />} />
                        <Route path="/rentals" element={<RentalsPage />} />
                        <Route path="/rentals/:rentalId" element={<RentalDetailsPage />} />
                        <Route path="/available-cars" element={<AvailableCarsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
