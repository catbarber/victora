import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { createDonationIntent, saveDonationRecord } from '../services/donationService';
import CloseIcon from '@mui/icons-material/Close';
import SailingIcon from '@mui/icons-material/Sailing';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import EmailIcon from '@mui/icons-material/Email';

const DonationModal = ({ amount, onClose, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Initialize payment intent with email if available
        createDonationIntent(amount, email)
            .then(({ clientSecret }) => setClientSecret(clientSecret))
            .catch(err => {
                setError('Failed to initialize donation. Please try again.');
                console.error('Error creating payment intent:', err);
            });

        return () => window.removeEventListener('resize', checkMobile);
    }, [amount, email]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/donation-success`,
                    receipt_email: email || undefined,
                },
                redirect: 'if_required',
            });

            if (stripeError) {
                setError(stripeError.message);
            } else {
                if (paymentIntent && paymentIntent.status === 'succeeded') {
                    await saveDonationRecord({
                        amount: amount,
                        stripePaymentIntentId: paymentIntent.id,
                        customerEmail: email,
                        status: 'completed',
                        timestamp: new Date().toISOString()
                    });
                }
                onSuccess();
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Payment error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`donation-modal ${isMobile ? 'mobile' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">
                        <SailingIcon className="title-icon" />
                        <h2>Support the Voyage</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="donation-summary">
                        <LocalAtmIcon className="summary-icon" />
                        <div className="summary-details">
                            <h3>Donation Amount</h3>
                            <p className="amount">${amount}</p>
                            <p className="description">Your support helps create more adventures!</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="payment-form">
                        {/* Email Input */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <EmailIcon className="label-icon" />
                                Email (Optional - for receipt)
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email for receipt"
                                className="form-input"
                            />
                        </div>

                        <div className="payment-element-wrapper">
                            <PaymentElement
                                options={{
                                    layout: isMobile ? 'tabs' : 'tabs',
                                    wallets: {
                                        applePay: 'never',
                                        googlePay: 'never'
                                    }
                                }}
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!stripe || isLoading || !clientSecret}
                            className="submit-donation-btn"
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <LocalAtmIcon />
                                    Donate ${amount}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="security-notice">
                        <p>🔒 Secure payment processed by Stripe</p>
                        <p>Your payment information is encrypted and secure</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationModal;