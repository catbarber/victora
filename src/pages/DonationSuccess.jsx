import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SailingIcon from '@mui/icons-material/Sailing';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CelebrationIcon from '@mui/icons-material/Celebration';

const DonationSuccess = () => {
    useEffect(() => {
        // Track successful donation
        window.gtag('event', 'donation_success', {
            event_category: 'donation',
            event_label: 'success'
        });
    }, []);

    return (
        <div className="donation-success-page">
            <div className="success-content">
                <div className="success-icon">
                    <CelebrationIcon style={{ fontSize: '4rem' }} />
                </div>

                <h1>Thank You for Your Support!</h1>

                <div className="success-message">
                    <p>Your generous donation has been received and will help keep the Victora sailing through many more adventures.</p>
                    <p>Captain Bartley and the entire crew thank you for joining our voyage!</p>
                </div>

                <div className="success-perks">
                    <h3>As a valued supporter, you'll receive:</h3>
                    <ul>
                        <li>📜 Your name in the ship's log (book acknowledgments)</li>
                        <li>⚓ Exclusive behind-the-scenes updates</li>
                        <li>⭐ Early access to new stories</li>
                        <li>💰 Special member discounts</li>
                    </ul>
                </div>

                <div className="success-actions">
                    <Link to="/" className="btn btn-primary">
                        <SailingIcon />
                        Return Home
                    </Link>
                    <Link to="/book-series" className="btn btn-outline">
                        <LocalAtmIcon />
                        Explore Books
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonationSuccess;