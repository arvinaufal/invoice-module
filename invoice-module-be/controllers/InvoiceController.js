"use strict";
const { Invoices, InvoiceProducts } = require("../models");
const fs = require("fs");
const path = require("path");

class InvoiceController {
    static async create(request, response, next) {
        const { customerName, salespersonName, selectedProducts, date, note = '' } = request.body;
        try {
            const invoice = await Invoices.create({ customerName, salespersonName, date, note });
            for (const selectedProduct of selectedProducts) {
                await InvoiceProducts.create({ invoiceId: invoice.id, productId: selectedProduct.id, quantity: selectedProduct.quantity });
            }
            response.status(201).json({ message: 'Invoice created successfully', invoice });
        } catch (error) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getInvoices(request, response, next) {
        try {
            const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8'));

            const page = parseInt(request.query.page) || 1;
            const limit = 10; // Set limit for pagination
            const offset = (page - 1) * limit;

            const invoices = await Invoices.findAll({ limit, offset });
            const totalInvoices = await Invoices.count();
            const hasMore = totalInvoices > offset + invoices.length;

            const invoiceDetails = await Promise.all(invoices.map(async (invoice) => {
                const invoiceProducts = await InvoiceProducts.findAll({ where: { invoiceId: invoice.id } });

                let totalAmount = 0;
                const selectedProducts = invoiceProducts.map((invoiceProduct) => {
                    const product = products.find(p => p.id === invoiceProduct.productId);
                    const totalPrice = product.price * invoiceProduct.quantity;
                    totalAmount += totalPrice;
                    return {
                        id: product.id,
                        name: product.name,
                        quantity: invoiceProduct.quantity,
                        price: product.price,
                        totalPrice
                    };
                });

                const formattedTotalAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount);

                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(new Date(invoice.date));

                return {
                    id: invoice.id,
                    customerName: invoice.customerName,
                    salespersonName: invoice.salespersonName,
                    date: formattedDate,
                    note: invoice.note,
                    selectedProducts,
                    totalAmount: formattedTotalAmount
                };
            }));

            response.status(200).json({ invoices: invoiceDetails, hasMore });
        } catch (error) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = InvoiceController;
