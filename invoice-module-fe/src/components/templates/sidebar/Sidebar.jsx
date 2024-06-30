import React from 'react';
import { TbPresentationAnalytics } from "react-icons/tb";
import { PiInvoice } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <section id="sidebar" className="w-1/6 min-h-screen flex flex-col border-r-2 shadow-right bg-white">
            <div className="w-full mt-4 mb-2 flex justify-center items-center bg-white py-4 cursor-default">
                <span className="text-2xl font-extrabold "><span className="italic"><span className="text-sky-600">Wida</span><span className="text-blue-400">Tech</span></span> 🚀</span>
            </div>
            
            <div className="w-full flex flex-col justify-center items-center gap-4 py-4">
                <div className="w-full flex justify-center items-center text-lg cursor-pointer">
                    <span className="px-6 py-1 rounded-full text-sky-600 hover:bg-blue-400 hover:font-semibold hover:text-blue-50 transition-all duration-500 ease-in-out flex flex-row gap-3">
                        <TbPresentationAnalytics size={24} className="relative top-[0.15rem]"/>Analytics
                    </span>
                </div>
                <div 
                    className="w-full flex justify-center items-center text-lg cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <span className="px-6 py-1 rounded-full text-sky-600 hover:bg-blue-400 hover:font-semibold hover:text-blue-50 transition-all duration-500 ease-in-out flex flex-row gap-3">
                        <PiInvoice size={24} className="relative top-[0.15rem]"/>Invoices
                    </span>
                </div>
            </div>
        </section>
    );
}
