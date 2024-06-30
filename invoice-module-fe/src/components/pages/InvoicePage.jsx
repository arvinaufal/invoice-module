// src/pages/InvoicePage.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Form from '../templates/form/form';
import Sidebar from '../templates/sidebar/Sidebar';
import InvoiceList from '../templates/invoicelist/invoicelist';
import { showInvoiceList } from '../../redux/visibilitySlice';

export default function InvoicePage() {
    const showList = useSelector((state) => state.visibility.showInvoiceList);
    const dispatch = useDispatch();
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (showList) {
            setInvoices([]); // Reset invoices when showList changes
            setPage(1); // Reset page number
        }
    }, [showList]);

    useEffect(() => {
        if (showList) {
            fetchInvoices(page);
        }
    }, [showList, page]);

    const fetchInvoices = async (page) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/invoices?page=${page}`);
            console.log("Fetched invoices:", response.data.invoices);
            setInvoices(prevInvoices => {
                const newInvoices = response.data.invoices.filter(invoice => !prevInvoices.some(i => i.id === invoice.id));
                return [...prevInvoices, ...newInvoices];
            });
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.error('Failed to fetch invoices', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = (e) => {
        if (loading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = e.target.scrollingElement;
        if (scrollHeight - scrollTop <= clientHeight + 50) { // Load more when near the bottom
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <section className="w-full min-h-screen flex flex-row">
            <Sidebar />
            <section className="w-5/6 min-h-full flex justify-center items-center">
                {showList ? (
                    <InvoiceList invoices={invoices} />
                ) : (
                    <Form />
                )}
            </section>
        </section>
    );
}
