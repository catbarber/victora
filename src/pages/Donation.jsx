import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationModal from '../components/DonationModal';
import SailingIcon from '@mui/icons-material/Sailing';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { recordDonationAttempt } from '../services/donationService';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donation = () => {
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(10);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const donationTiers = [
        { amount: 5, label: "Powder Monkey", icon: "⚡", desc: "Keep the cannons loaded!" },
        { amount: 10, label: "Seasoned Sailor", icon: "⚓", desc: "Help navigate rough seas" },
        { amount: 25, label: "First Mate", icon: "⭐", desc: "Second in command support" },
        { amount: 50, label: "Quartermaster", icon: "💰", desc: "Manage the ship's treasure" },
        { amount: 100, label: "Captain's Circle", icon: "👑", desc: "Join the elite inner circle" }
    ];

    const perks = [
        { icon: <StarIcon />, text: "Exclusive behind-the-scenes content" },
        { icon: <SailingIcon />, text: "Your name in the ship's log (book acknowledgments)" },
        { icon: <FavoriteIcon />, text: "Early access to new chapters and stories" },
        { icon: <LocalAtmIcon />, text: "Special discounts on future book releases" }
    ];

    const handleDonationClick = () => {
        // Record donation attempt
        recordDonationAttempt({
            amount: selectedAmount,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });

        setShowDonationModal(true);
    };

    return (
        <div className="donation-page">
            <div className="page-title">
                <SailingIcon className="title-icon" />
                <h1>Support the Voyage</h1>
                <p>Help Keep the Adventure Sailing!</p>
            </div>

            <div className="donation-content">
                <div className="donation-hero">
                    <div className="treasure-chest">
                        <h2>Join Captain Bartley's Crew</h2>
                        <p>
                            Your support helps create more thrilling adventures, develop new stories,
                            and keep the Victora sailing through treacherous waters. Every donation
                            brings new tales to life!
                        </p>
                    </div>
                </div>

                <div className="donation-options">
                    <h3>Choose Your Donation Tier</h3>
                    <div className={`tier-grid ${isMobile ? 'mobile' : ''}`}>
                        {donationTiers.map((tier) => (
                            <div
                                key={tier.amount}
                                className={`tier-card ${selectedAmount === tier.amount ? 'selected' : ''}`}
                                onClick={() => setSelectedAmount(tier.amount)}
                            >
                                <div className="tier-icon">{tier.icon}</div>
                                <div className="tier-amount">${tier.amount}</div>
                                <div className="tier-label">{tier.label}</div>
                                <div className="tier-desc">{tier.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div className="custom-amount">
                        <label>Or Enter Custom Treasure:</label>
                        <div className="custom-input">
                            <span className="currency-symbol">$</span>
                            <input
                                type="number"
                                min="1"
                                value={selectedAmount}
                                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>

                    <button
                        className="donate-btn-large"
                        onClick={handleDonationClick}
                    >
                        <LocalAtmIcon />
                        Donate ${selectedAmount} to the Voyage
                    </button>
                </div>

                <div className="perks-section">
                    <h3>Become Part of the Legend</h3>
                    <div className={`perks-grid ${isMobile ? 'mobile' : ''}`}>
                        {perks.map((perk, index) => (
                            <div key={index} className="perk-card">
                                <div className="perk-icon">{perk.icon}</div>
                                <p>{perk.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonial-section">
                    <h3>From the Ship's Log</h3>
                    <div className="testimonial">
                        <p>"Supporting this voyage felt like joining the crew itself! Knowing I'm helping bring these amazing stories to life is treasure enough."</p>
                        <cite>- A Loyal Reader</cite>
                    </div>
                </div>
            </div>

            {showDonationModal && (
                <Elements stripe={stripePromise}>
                    <DonationModal
                        amount={selectedAmount}
                        onClose={() => setShowDonationModal(false)}
                        onSuccess={() => {
                            setShowDonationModal(false);
                            // Redirect to success page
                            window.location.href = '/donation-success';
                        }}
                    />
                </Elements>
            )}
        </div>
    );
};

export default Donation;