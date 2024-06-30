const express = require('express');
const { response } = require('../app');
const InvoiceController = require('../controllers/InvoiceController');
const router = express.Router();

router.post('/invoices/add', InvoiceController.create);
router.get('/invoices', InvoiceController.getInvoices);


module.exports = router;