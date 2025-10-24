const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();
const stripe = new Stripe(functions.config().stripe.secret_key, {
    apiVersion: '2023-10-16'
});

// Create Donation Intent Callable Function
exports.createDonationIntent = functions.https.onCall(async (data, context) => {
    try {
        const { amount, email } = data;

        // Validate amount
        if (!amount || amount < 1) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Invalid donation amount. Minimum donation is $1.'
            );
        }

        if (amount > 10000) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Donation amount too high. Maximum donation is $10,000.'
            );
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                project: 'voyages-of-victora',
                timestamp: new Date().toISOString(),
                source: 'website_donation'
            },
            description: `Donation to Voyages of Victora - $${amount}`,
            receipt_email: email || null,
        });

        // Log donation attempt in Firestore
        await admin.firestore().collection('donationAttempts').add({
            amount: amount,
            intentId: paymentIntent.id,
            project: 'voyages-of-victora',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            status: 'intent_created',
            userAgent: context.rawRequest.get('user-agent'),
            email: email || 'not_provided'
        });

        return {
            clientSecret: paymentIntent.client_secret,
            intentId: paymentIntent.id
        };
    } catch (error) {
        console.error('Error creating payment intent:', error);

        await admin.firestore().collection('donationErrors').add({
            error: error.message,
            amount: data.amount,
            project: 'voyages-of-victora',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            type: 'intent_creation_failed'
        });

        throw new functions.https.HttpsError(
            'internal',
            'Unable to process donation at this time. Please try again later.'
        );
    }
});

// Stripe Webhook Endpoint
exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            functions.config().stripe.webhook_secret
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
        case 'payment_intent.succeeded':
            await handlePaymentIntentSucceeded(event.data.object);
            break;

        case 'payment_intent.payment_failed':
            await handlePaymentIntentFailed(event.data.object);
            break;

        case 'payment_intent.canceled':
            await handlePaymentIntentCanceled(event.data.object);
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

// Handle successful payment
async function handlePaymentIntentSucceeded(paymentIntent) {
    try {
        // Record successful donation
        const donationRef = await admin.firestore().collection('donations').add({
            amount: paymentIntent.amount / 100,
            stripePaymentIntentId: paymentIntent.id,
            customerEmail: paymentIntent.receipt_email,
            currency: paymentIntent.currency,
            project: 'voyages-of-victora',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            status: 'completed',
            payment_method: paymentIntent.payment_method_types?.[0] || 'unknown',
            metadata: paymentIntent.metadata
        });

        console.log('Donation recorded successfully:', paymentIntent.id, 'Doc ID:', donationRef.id);

        // Update donation attempt status
        const attemptsSnapshot = await admin.firestore()
            .collection('donationAttempts')
            .where('intentId', '==', paymentIntent.id)
            .get();

        if (!attemptsSnapshot.empty) {
            await attemptsSnapshot.docs[0].ref.update({
                status: 'completed',
                completedAt: admin.firestore.FieldValue.serverTimestamp(),
                donationId: donationRef.id
            });
        }

        // Send confirmation email (optional - you can add this later)
        // await sendDonationConfirmationEmail(paymentIntent);

    } catch (error) {
        console.error('Error handling successful payment:', error);

        await admin.firestore().collection('donationErrors').add({
            error: error.message,
            stripePaymentIntentId: paymentIntent.id,
            project: 'voyages-of-victora',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            type: 'webhook_processing_failed',
            event: 'payment_intent.succeeded'
        });
    }
}

// Handle failed payment
async function handlePaymentIntentFailed(paymentIntent) {
    try {
        await admin.firestore().collection('donationErrors').add({
            error: paymentIntent.last_payment_error?.message || 'Payment failed',
            stripePaymentIntentId: paymentIntent.id,
            project: 'voyages-of-victora',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            type: 'payment_failed',
            amount: paymentIntent.amount / 100
        });

        // Update donation attempt status
        const attemptsSnapshot = await admin.firestore()
            .collection('donationAttempts')
            .where('intentId', '==', paymentIntent.id)
            .get();

        if (!attemptsSnapshot.empty) {
            await attemptsSnapshot.docs[0].ref.update({
                status: 'failed',
                failedAt: admin.firestore.FieldValue.serverTimestamp(),
                error: paymentIntent.last_payment_error?.message || 'Payment failed'
            });
        }

    } catch (error) {
        console.error('Error handling failed payment:', error);
    }
}

// Handle canceled payment
async function handlePaymentIntentCanceled(paymentIntent) {
    try {
        // Update donation attempt status
        const attemptsSnapshot = await admin.firestore()
            .collection('donationAttempts')
            .where('intentId', '==', paymentIntent.id)
            .get();

        if (!attemptsSnapshot.empty) {
            await attemptsSnapshot.docs[0].ref.update({
                status: 'canceled',
                canceledAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }

    } catch (error) {
        console.error('Error handling canceled payment:', error);
    }
}

// Optional: Function to get donation statistics
exports.getDonationStats = functions.https.onCall(async (data, context) => {
    try {
        const donationsSnapshot = await admin.firestore()
            .collection('donations')
            .where('project', '==', 'voyages-of-victora')
            .where('status', '==', 'completed')
            .get();

        const totalAmount = donationsSnapshot.docs.reduce((sum, doc) => {
            return sum + (doc.data().amount || 0);
        }, 0);

        const totalDonations = donationsSnapshot.size;

        // Get recent donations (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentDonationsSnapshot = await admin.firestore()
            .collection('donations')
            .where('project', '==', 'voyages-of-victora')
            .where('status', '==', 'completed')
            .where('timestamp', '>=', thirtyDaysAgo)
            .get();

        const recentAmount = recentDonationsSnapshot.docs.reduce((sum, doc) => {
            return sum + (doc.data().amount || 0);
        }, 0);

        return {
            totalAmount: Math.round(totalAmount * 100) / 100,
            totalDonations: totalDonations,
            averageDonation: totalDonations > 0 ? Math.round((totalAmount / totalDonations) * 100) / 100 : 0,
            recentAmount: Math.round(recentAmount * 100) / 100,
            recentDonations: recentDonationsSnapshot.size
        };
    } catch (error) {
        console.error('Error getting donation stats:', error);
        throw new functions.https.HttpsError('internal', 'Unable to retrieve donation statistics');
    }
});