import { FaCheckCircle } from 'react-icons/fa';

export const PitchCard = () => {
    return (
            <div className="text-container bg-white p-4 m-4" style={{ borderRadius: '15px' }}>
                <h2 className="mb-4">Why join POQ?</h2>
                <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Rent cars anywhere in the world</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Full insurance coverage included</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Get exclusive offers and discounts</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">Access a wide range of vehicles</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                        <p className="mb-0">24/7 customer support</p>
                    </div>
                </div>
            </div>
    )
}