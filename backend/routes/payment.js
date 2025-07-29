
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { initiatePayment, checkPaymentStatus } = require('../utils/phonepe');
const { createTransaction, updateTransactionByMerchantId } = require('../models/Transaction');

const router = express.Router();

// @route   POST /api/payment/pay
// @desc    Initiate a payment with PhonePe
// @access  Public
router.post('/pay', async (req, res) => {
    try {
        const { name, email, amount, userId } = req.body;
        const merchantTransactionId = `MUID-${uuidv4()}`;

        // 1. Create a pending transaction record in the database
        await createTransaction({
            merchantTransactionId,
            userId,
            amount,
            status: 'PENDING',
        });

        // 2. Initiate payment with PhonePe
        const paymentResponse = await initiatePayment(amount, merchantTransactionId, userId);

        if (paymentResponse.success) {
            res.json({ success: true, redirectUrl: paymentResponse.redirectUrl });
        } else {
            res.status(400).json({ success: false, message: paymentResponse.message });
        }

    } catch (error) {
        console.error('Error in /pay route:', error);
        await updateTransactionByMerchantId(merchantTransactionId, { status: 'FAILED' });
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// @route   POST /api/payment/callback
// @desc    Handle PhonePe callback after payment attempt
// @access  Public (should be webhook)
router.post('/callback', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload || !payload.response) {
            return res.status(400).json({ success: false, message: "Invalid callback data" });
        }

        const decodedResponse = Buffer.from(payload.response, 'base64').toString('utf8');
        const responseData = JSON.parse(decodedResponse);

        const { merchantTransactionId, code: status, transactionId: providerTransactionId } = responseData.data;

        let finalStatus = 'FAILED';
        if (status === 'PAYMENT_SUCCESS') {
            finalStatus = 'SUCCESS';
        } else if (status === 'PAYMENT_PENDING') {
            finalStatus = 'PENDING';
        }

        // Update transaction in DB
        await updateTransactionByMerchantId(merchantTransactionId, { 
            status: finalStatus,
            providerTransactionId,
            responseData: decodedResponse,
        });

        console.log(`Callback received for ${merchantTransactionId} with status ${finalStatus}`);

        // Note: The frontend will handle the redirect and final status check.
        // This callback is for server-to-server confirmation.
        res.status(200).send();

    } catch (error) {
        console.error("Error in PhonePe callback:", error);
        res.status(500).send("Error processing callback");
    }
});


// @route   GET /api/payment/status/:merchantTransactionId
// @desc    Check payment status from frontend
// @access  Public
router.get('/status/:merchantTransactionId', async (req, res) => {
    try {
        const { merchantTransactionId } = req.params;
        const statusResponse = await checkPaymentStatus(merchantTransactionId);
        
        if (statusResponse.success) {
            res.json({
                success: true,
                ...statusResponse
            });
        } else {
            res.status(400).json({ success: false, message: statusResponse.message });
        }
    } catch (error) {
        console.error('Error checking payment status:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


module.exports = router;
