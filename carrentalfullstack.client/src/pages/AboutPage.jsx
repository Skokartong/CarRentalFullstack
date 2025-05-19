import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuBicepsFlexed } from "react-icons/lu";
import { Footer } from '../components/Footer';
import './styles/AboutPage.css';

export function AboutPage() {
    return (
        <div className="about-page-wrapper">
            <div className="container py-4 about-page">
                <div className="text-center mb-5">
                    <h1 className="display-4">About Us</h1>
                    <p className="lead"><span>POQ</span> is your trusted partner for safe, flexible, and convenient car rentals.</p>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 rounded-4 shadow-sm">
                            <h5><AiFillSafetyCertificate className="icon text-primary" /> Safety First</h5>
                            <p>Our vehicles undergo regular maintenance and safety inspections.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 rounded-4 shadow-sm">
                            <h5><LuBicepsFlexed className="icon text-success" /> Flexible Options</h5>
                            <p>Rent by the hour, day, or week. Choose what suits your journey best.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 rounded-4 shadow-sm">
                            <h5><FaHandHoldingHeart className="icon text-danger" /> Customer-Centric</h5>
                            <p>We're here for you with transparency, support, and friendly service.</p>
                        </div>
                    </div>
                </div>

                <div className="card contact-card mt-5">
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="left">
                            <h3>Contact Us</h3>
                            <p>
                                Phone: <a href="tel:+46812345678">+46 8 123 456 78</a> <br />
                                Email: <a href="mailto:info@poq.com">info@poq.com</a><br />
                                <a href="#" className="ms-2"><FaFacebook /></a>
                                <a href="#" className="ms-2"><FaInstagram /></a>
                                <a href="#" className="ms-2"><FaLinkedin /></a>
                            </p>
                        </div>
                        <div className="right">
                            <h3>Headquarters</h3>
                            <p>
                                Vasagatan 2222 <br />
                                111 20 Stockholm <br />
                                Sweden <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}