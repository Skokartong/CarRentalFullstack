import React, { useEffect, useState } from 'react';
import { getAccount } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AccountCard } from '../components/AccountCard';
import { ActiveRentalsCard } from '../components/ActiveRentalsCard';
import { Spinner, Alert } from 'react-bootstrap';
import './styles/AccountPage.css';

export function AccountPage() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await getAccount();
                setAccount(data);
            } catch (err) {
                setError('Could not load account info');
                console.error(err);
            }
        };

        fetchAccount();
    }, []);

    if (error) return <div>{error}</div>;
    if (!account) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
            </div>
        );
    }

    return (
        <div className="account-page-container py-3">
            <div className="account-column">
                <AccountCard account={account} />
            </div>
            <div className="account-column">
                <ActiveRentalsCard />
            </div>
        </div>
    );
}
