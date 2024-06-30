import React from 'react';

const InvoiceCard = ({ invoice }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full">
        <div className="flex justify-between items-center mb-2">
            <h3 className="px-4 py-1 bg-purple-400 rounded-full"><span className='text-white text-lg font-semibold italic'>Invoice #{invoice.id}</span></h3>
            <span className="text-sm text-white px-2 py-1 bg-gray-400 font-semibold rounded-sm">{invoice.date}</span>
        </div>
        <table className="w-full text-left text-gray-700">
            <tbody>
                <tr>
                    <th className="px-4 py-2 font-semibold w-1/12">Customer</th>
                    <td className="px-4 py-2">: {invoice.customerName}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2 font-semibold w-1/12">Salesperson</th>
                    <td className="px-4 py-2">: {invoice.salespersonName}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2 font-semibold w-1/12">Note</th>
                    <td className="px-4 py-2">: {invoice.note}</td>
                </tr>
                <tr className='bg-pink-200'>
                    <th className="px-4 py-2 w-1/6 font-bold italic">Total amount</th>
                    <td className="px-4 py-2 font-bold italic">: {invoice.totalAmount}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    );
};

export default InvoiceCard;
