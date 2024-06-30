import React from 'react';
import { useDispatch } from 'react-redux';
import { showForm } from '../../../redux/visibilitySlice';
import InvoiceCard from '../invoice/card';

const InvoiceList = ({ invoices }) => {
    const dispatch = useDispatch();
    return (
        <section id="invoice-list" className="flex flex-col w-full min-h-screen p-4 bg-gray-100">
            <div className="flex flex-row justify-center items-center mt-6 mb-4 pr-4 gap-4">
                <div className="flex flex-row px-6 pt-1 pb-2 bg-blue-400 rounded-full justify-center items-center shadow-lg">
                    <span className="italic font-bold text-3xl text-white cursor-default">Invoice List</span>
                </div>
            </div>
            <div className='flex w-full px-8 justify-end items-end my-8'>
                <div className='px-4 py-1 bg-sky-500 hover:bg-sky-600 rounded-full cursor-pointer' onClick={() => dispatch(showForm())}>
                    <span className='text-white text-xl italic'>Create invoice</span>
                </div>

            </div>
            <div className="flex flex-col space-y-4">
                {invoices.map((invoice, idx) => (
                    <InvoiceCard key={idx} invoice={invoice} />
                ))}
            </div>
        </section>
    );
};

export default InvoiceList;
