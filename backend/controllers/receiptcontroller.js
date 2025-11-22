const ReceiptModel = require('../models/receiptmodel');
const StockMoveModel = require('../models/stockMoveModel');

async function createReceipt(req, res) {
    try {
        const { contact_id, lines } = req.body;

       const { id } = await ReceiptModel.createReceipt({ contact_id });
console.log("RECEIPT ID RECEIVED IN CONTROLLER:", id);

        for (const line of lines || []) {
            await ReceiptModel.addReceiptLine({
                receipt_id: id,
                product_id: line.product_id,
                quantity: line.quantity
            });
        }

        res.status(201).json({ id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function validateReceipt(req, res) {
    try {
        const receiptId = req.params.id;

        const lines = await ReceiptModel.getReceiptLines(receiptId);

        for (const line of lines) {
            await StockMoveModel.insertStockMove({
                product_id: line.product_id,
                quantity: line.quantity,
                move_type: 'IN',
                reference: `WH/IN/${receiptId}`,
                source: 'Vendor',
                destination: 'Warehouse'
            });
        }

        await ReceiptModel.setReceiptStatus(receiptId, 'Done');

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createReceipt, validateReceipt };
