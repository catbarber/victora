import { db, functions, analytics } from '../firebase/config';
import { httpsCallable } from 'firebase/functions';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

export const createDonationIntent = async (amount, email = '') => {
    try {
        // Log donation attempt in analytics
        logEvent(analytics, 'donation_attempt', {
            amount: amount,
            currency: 'USD'
        });

        const createDonationIntentFunction = httpsCallable(functions, 'createDonationIntent');
        const result = await createDonationIntentFunction({
            amount: amount,
            email: email
        });
        return result.data;
    } catch (error) {
        console.error('Error creating donation intent:', error);

        // Log error in analytics
        logEvent(analytics, 'donation_error', {
            error: error.message,
            amount: amount
        });

        throw error;
    }
};

export const saveDonationRecord = async (donationData) => {
    try {
        const donationRef = await addDoc(collection(db, 'donations'), {
            ...donationData,
            createdAt: serverTimestamp(),
            status: 'completed',
            project: 'voyages-of-victora'
        });

        // Log successful donation in analytics
        logEvent(analytics, 'donation_success', {
            amount: donationData.amount,
            donation_id: donationRef.id
        });

        return donationRef.id;
    } catch (error) {
        console.error('Error saving donation record:', error);
        throw error;
    }
};

export const recordDonationAttempt = async (paymentData) => {
    try {
        await addDoc(collection(db, 'donationAttempts'), {
            ...paymentData,
            project: 'voyages-of-victora',
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error('Error recording donation attempt:', error);
    }
};

export const getDonationStats = async () => {
    try {
        const getDonationStatsFunction = httpsCallable(functions, 'getDonationStats');
        const result = await getDonationStatsFunction();
        return result.data;
    } catch (error) {
        console.error('Error getting donation stats:', error);
        throw error;
    }
};