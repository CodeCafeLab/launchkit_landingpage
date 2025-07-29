
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createTransactionsTable = async () => {
    const connection = await db.getConnection();
    try {
        const sql = `
        CREATE TABLE transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            merchantTransactionId VARCHAR(255) NOT NULL UNIQUE,
            userId VARCHAR(255),
            amount DECIMAL(10, 2) NOT NULL,
            status VARCHAR(50) NOT NULL,
            providerTransactionId VARCHAR(255),
            responseData TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`;
        await connection.query(sql);
        console.log("Transactions table is ready.");
    } catch (err) {
        console.error("Error creating transactions table:", err);
    } finally {
        connection.release();
    }
};

const createTransaction = async (txData) => {
    const { merchantTransactionId, userId, amount, status } = txData;
    const sql = 'INSERT INTO transactions (merchantTransactionId, userId, amount, status) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.query(sql, [merchantTransactionId, userId, amount, status]);
        return result;
    } catch (err) {
        console.error("Error creating transaction:", err);
        throw err;
    }
};

const updateTransactionByMerchantId = async (merchantTransactionId, txData) => {
    // Build the SET part of the query dynamically
    const fields = Object.keys(txData);
    const values = Object.values(txData);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    if (fields.length === 0) {
        return; // Nothing to update
    }

    const sql = `UPDATE transactions SET ${setClause} WHERE merchantTransactionId = ?`;
    try {
        const [result] = await db.query(sql, [...values, merchantTransactionId]);
        return result;
    } catch (err) {
        console.error("Error updating transaction:", err);
        throw err;
    }
};

module.exports = { 
    db,
    createTransactionsTable,
    createTransaction, 
    updateTransactionByMerchantId
};
