import React from 'react';
import defaultImage from '../assets/carola.jpg';

export const AccountCard = ({ account }) => {
    const [image, setImage] = React.useState(defaultImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImage(imgUrl);
        }
    };

    return (
        <div className="card shadow-sm p-3 mb-5 bg-white rounded-lg" style={{ width: '24rem', borderRadius: '25px' }}>
            <div className="text-center">
                <img
                    src={image}
                    alt="Profile"
                    className="rounded-circle mt-3"
                    style={{ width: '180px', height: '180px', objectFit: 'cover', border: '2px solid #ccc' }}
                />
                <div className="mt-2">
                    <label htmlFor="uploadImage" className="btn btn-outline-primary btn-sm">
                        Change Image
                    </label>
                    <input
                        id="uploadImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            <div className="card-body">
                <h3 className="card-title">{account.firstname} {account.lastname}</h3>
                <p className="card-text">
                    <strong>Email:</strong> {account.email} <br />
                    <strong>Phone:</strong> {account.phone} <br />
                    <strong>Address:</strong> {account.address}, {account.postalCode}<br />
                    <strong>City:</strong> {account.city} <br />
                    <strong>Country:</strong> {account.country} <br />
                    <strong>Birth Date:</strong> {new Date(account.birthDate).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};
