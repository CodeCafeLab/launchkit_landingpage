
const axios = require('axios');
const crypto = require('crypto');

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = parseInt(process.env.PHONEPE_SALT_INDEX, 10);
const PHONEPE_HOST_URL = process.env.PHONEPE_HOST_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Function to initiate a payment
const initiatePayment = async (amount, merchantTransactionId, userId) => {
    const data = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount * 100, // Amount in paisa
        redirectUrl: `${FRONTEND_URL}/payment/status/${merchantTransactionId}`,
        redirectMode: 'POST',
        callbackUrl: `http://localhost:4000/api/payment/callback`, // Your backend callback URL
        mobileNumber: '9999999999', // Placeholder
        paymentInstrument: {
            type: 'PAY_PAGE',
        },
    };

    const payload = JSON.stringify(data);
    const base64Payload = Buffer.from(payload).toString('base64');
    
    const stringToHash = base64Payload + '/pg/v1/pay' + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerify = sha256 + '###' + SALT_INDEX;

    const options = {
        method: 'post',
        url: `${PHONEPE_HOST_URL}/pg/v1/pay`,
        headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify,
        },
        data: {
            request: base64Payload,
        },
    };

    try {
        const response = await axios.request(options);
        if (response.data.success) {
            return {
                success: true,
                redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Payment initiation failed',
            };
        }
    } catch (error) {
        console.error('PhonePe API Error:', error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to connect to payment gateway',
        };
    }
};

// Function to check payment status
const checkPaymentStatus = async (merchantTransactionId) => {
    const stringToHash = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerify = sha256 + '###' + SALT_INDEX;

    const options = {
        method: 'get',
        url: `${PHONEPE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            'Content-Type': 'application/json',
            'X-MERCHANT-ID': MERCHANT_ID,
            'X-VERIFY': xVerify,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('PhonePe Status Check Error:', error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to check payment status',
        };
    }
};


module.exports = { initiatePayment, checkPaymentStatus };
