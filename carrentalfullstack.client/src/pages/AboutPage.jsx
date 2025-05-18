import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuBicepsFlexed } from "react-icons/lu";
import './AboutPage.css';

export function AboutPage() {
    return (
        <div className="container py-4 about-page">
            <div className="text-center mb-5">
                <h1 className="display-4">About Us</h1>
                <p className="lead">Your trusted partner for safe, flexible, and convenient car rentals</p>
            </div>

            <div className="row text-center mb-5">
                <div className="card col-md-4">
                    <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                    <h5><AiFillSafetyCertificate/> Safety First</h5>
                    <p>Our vehicles undergo regular maintenance and strict safety inspections.</p>
                </div>
                <div className="card col-md-4">
                    <i className="bi bi-speedometer2 display-4 text-success mb-3"></i>
                    <h5><LuBicepsFlexed/> Flexible Options</h5>
                    <p>Rent by the hour, day, or week. Choose what suits your journey best.</p>
                </div>
                <div className="card col-md-4">
                    <i className="bi bi-people-fill display-4 text-warning mb-3"></i>
                    <h5><FaHandHoldingHeart/> Customer-Centric</h5>
                    <p>We're here for you with transparency, support, and friendly service.</p>
                </div>
            </div>

            <div className="bg-blue p-4 rounded-lg shadow-sm">
                <h4>Contact Us</h4>
                <p>
                    Headquarters: Vasagatan 2222, 111 20 Stockholm, Sweden <br />
                    Phone: <a href="tel:+46812345678">+46 8 123 456 78</a> <br />
                    Email: <a href="mailto:info@driveaway.com">info@poq.com</a>
                </p>
                <p>
                    Socials:
                    <a href="#" className="ms-2"><FaFacebook /></a> |
                    <a href="#" className="ms-2"><FaInstagram /></a> |
                    <a href="#" className="ms-2"><FaLinkedin/></a>
                </p>
            </div>
        </div>
    );
}
