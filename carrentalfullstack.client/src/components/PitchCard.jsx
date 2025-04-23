import { FaCheckCircle } from 'react-icons/fa';

export const PitchCard = () => {
    return (
        <div className="col-12 col-md-6 py-5 d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: 'url("src/assets/roadtrip.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-container">
                <h2 className="mb-4">Why join POQ?</h2>
                <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Rent cars anywhere in the world</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Access a wide range of vehicles</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Get amazing offers and discounts</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">24/7 customer support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}