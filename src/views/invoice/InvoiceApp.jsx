import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BillToPopUp from '../../component/invoiceComponents/BillToPopUp';
import ProductPopUp from '../../component/invoiceComponents/ProductPopUp';
import InvoiceLogoUpload from '../../component/invoiceComponents/InvoiceLogoUpload';
import { Edit2, Plus, Trash2, Upload, Save, FileText, Download, Calculator, CreditCard, User, Package } from 'lucide-react';




export default function InvoiceApp() {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        billTo: {
            name: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            gstin: ''
        },
        description: '',
        products: [],
        taxRate: 0,
        currency: 'INR',
        language: 'English',
        paymentInfo: {
            accountName: '',
            accountNumber: '',
            bankName: ''
        }
    });

    const [newProduct, setNewProduct] = useState({
        description: '',
        quantity: "",
        rate: "",
        amount: ""
    });

    const [showProductForm, setShowProductForm] = useState(false);
    const [savedInvoices, setSavedInvoices] = useState([]);
    const [prefix, setPrefix] = useState('');
    const [showBillToPopup, setShowBillToPopup] = useState(false);
    const invoiceRef = useRef();



    // Invoice number auto generation
    useEffect(() => {
        const generateInvoiceNumber = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const storedCounter = 1; // Simplified for demo
            const formattedCounter = String(storedCounter).padStart(3, "0");

            const billNumber = prefix
                ? `${prefix.toUpperCase()}${year}${month}${day}${formattedCounter}`
                : `${year}${month}${day}${formattedCounter}`;

            setInvoiceData(prev => ({
                ...prev,
                invoiceNumber: billNumber
            }));
        };

        generateInvoiceNumber();
    }, [prefix]);

    // Calculate totals
    const subtotal = invoiceData.products.reduce((sum, product) => sum + product.amount, 0);
    const taxAmount = (subtotal * invoiceData.taxRate) / 100;
    const total = subtotal + taxAmount;

    // Update product amount when quantity or rate changes
    useEffect(() => {
        setNewProduct(prev => ({
            ...prev,
            amount: prev.quantity * prev.rate
        }));
    }, [newProduct.quantity, newProduct.rate]);

    const handleInputChange = (field, value, nested = null) => {
        if (nested) {
            setInvoiceData(prev => ({
                ...prev,
                [nested]: {
                    ...prev[nested],
                    [field]: value
                }
            }));
        } else {
            setInvoiceData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const addProduct = () => {
        if (newProduct.description && newProduct.quantity > 0 && newProduct.rate > 0) {
            setInvoiceData(prev => ({
                ...prev,
                products: [...prev.products, { ...newProduct, id: Date.now() }]
            }));
            setNewProduct({ description: '', quantity: '', rate: '', amount: '' });
            setShowProductForm(false);
        }
    };

    const removeProduct = (id) => {
        setInvoiceData(prev => ({
            ...prev,
            products: prev.products.filter(product => product.id !== id)
        }));
    };

    const saveInvoice = () => {
        const invoice = {
            ...invoiceData,
            id: Date.now(),
            savedAt: new Date().toISOString(),
            subtotal,
            taxAmount,
            total
        };
        setSavedInvoices(prev => [...prev, invoice]);
        alert('Invoice saved successfully!');
    };

    const generateInvoice = () => {
        const invoice = {
            ...invoiceData,
            subtotal,
            taxAmount,
            total
        };
        console.log('Generated Invoice:', invoice);
        alert('Invoice generated! Check console for details.');
    };
    const handleDownloadPDF = async () => {
        const input = invoiceRef.current;
        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${invoiceData.invoiceNumber || 'invoice'}.pdf`);
    };


    return (
        <div ref={invoiceRef} className="min-h-screen bg-indigo-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-blue-500 text-white rounded-t-2xl shadow-lg">
                    <div className="p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Create Invoice</h1>
                                    <p className="text-blue-100 mt-1">Professional invoice generator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-b-2xl shadow-xl">
                    <div className="p-8">
                        {/* Top Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                            {/* Logo Upload */}
                            <div className="lg:col-span-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                    Company Logo
                                </h3>
                                <InvoiceLogoUpload />
                            </div>

                            {/* Invoice Details */}
                            <div className="lg:col-span-2">
                                <div className="bg-blue-50 rounded-2xl p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-blue-600 rounded-xl p-2">
                                            <FileText className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-blue-800">TAX INVOICE</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="invoiceDate" className="block text-sm font-semibold text-gray-700">Invoice Date</label>
                                            <input
                                                id='invoiceDate'
                                                type="date"
                                                value={invoiceData.invoiceDate}
                                                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Prefix (optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. AB"
                                                value={prefix}
                                                onChange={(e) => setPrefix(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Invoice No.</label>
                                            <input
                                                type="text"
                                                value={invoiceData.invoiceNumber}
                                                readOnly
                                                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Due Date</label>
                                            <input
                                                type="date"
                                                value={invoiceData.dueDate}
                                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-1 md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700">Currency</label>
                                            <select
                                                value={invoiceData.currency}
                                                onChange={(e) => handleInputChange('currency', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            >
                                                <option value="INR">INR - Indian Rupee</option>
                                                <option value="USD">USD - US Dollar</option>
                                                <option value="EUR">EUR - Euro</option>
                                                <option value="GBP">GBP - British Pound</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bill To Section */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Customer Information
                            </h3>
                            <div
                                onClick={() => setShowBillToPopup(true)}
                                className="group cursor-pointer border-2 border-dashed border-blue-300 hover:border-blue-500 bg-indigo-50 hover:indigo-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-600 group-hover:bg-blue-700 rounded-xl p-3 transition-colors">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-blue-800 group-hover:text-blue-900">Bill To</h4>
                                            <p className="text-blue-600 text-sm mt-1">Click to add customer details</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
                                        <Edit2 className="w-5 h-5" />
                                        <span className="text-sm font-medium">Edit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bill To Popup */}
                        {showBillToPopup && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
                                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl m-4">
                                    <BillToPopUp
                                        invoiceData={invoiceData}
                                        handleInputChange={handleInputChange}
                                        setShowBillToPopup={setShowBillToPopup}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Edit2 className="w-5 h-5 text-blue-600" />
                                Description (optional)
                            </h3>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <textarea
                                    placeholder="Enter invoice description..."
                                    value={invoiceData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-blue-600" />
                                Products & Services
                            </h3>
                            <div
                                className="group cursor-pointer border-2 border-dashed border-green-300 hover:border-green-500 bg-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg mb-6"
                                onClick={() => setShowProductForm(true)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-600 group-hover:bg-green-700 rounded-xl p-3 transition-colors">
                                            <Package className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-green-800 group-hover:text-green-900">Add Products</h4>
                                            <p className="text-green-600 text-sm mt-1">Click to add products or services</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 group-hover:text-green-700">
                                        <Plus className="w-5 h-5" />
                                        <span className="text-sm font-medium">Add</span>
                                    </div>
                                </div>
                            </div>

                            {/* Product Form Popup */}
                            {showProductForm && (
                                <ProductPopUp
                                    setShowProductForm={setShowProductForm}
                                    newProduct={newProduct}
                                    setNewProduct={setNewProduct}
                                    addProduct={addProduct}
                                />
                            )}

                            {/* Products List */}
                            {invoiceData.products.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Quantity</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Rate</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Amount</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {invoiceData.products.map((product, index) => (
                                                    <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.description}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-700 text-center">{product.quantity}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-700 text-center">{product.rate}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 text-center font-semibold">{product.amount}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={() => removeProduct(product.id)}
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tax and Totals */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-blue-600" />
                                Tax & Calculations
                            </h3>
                            <div className="bg-amber-50 border border-yellow-200 rounded-2xl p-8 shadow-sm">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Tax Rate (%)</label>
                                        <input
                                            type="number"
                                            value={invoiceData.taxRate}
                                            onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-lg"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 font-medium">Subtotal:</span>
                                                <span className="text-lg font-semibold text-gray-800">{invoiceData.currency} {subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 font-medium">Tax ({invoiceData.taxRate}%):</span>
                                                <span className="text-lg font-semibold text-gray-800">{invoiceData.currency} {taxAmount.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t-2 border-gray-200 pt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-bold text-gray-900">Total:</span>
                                                    <span className="text-2xl font-bold text-blue-600">{invoiceData.currency} {total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                Payment Information
                            </h3>
                            <div className="bg-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Account Name</label>
                                        <input
                                            type="text"
                                            value={invoiceData.paymentInfo.accountName}
                                            onChange={(e) => handleInputChange('accountName', e.target.value, 'paymentInfo')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter account name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Account Number</label>
                                        <input
                                            type="text"
                                            value={invoiceData.paymentInfo.accountNumber}
                                            onChange={(e) => handleInputChange('accountNumber', e.target.value, 'paymentInfo')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter account number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
                                        <input
                                            type="text"
                                            value={invoiceData.paymentInfo.bankName}
                                            onChange={(e) => handleInputChange('bankName', e.target.value, 'paymentInfo')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter bank name"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end mb-8">
                            <button
                                onClick={saveInvoice}
                                className="group bg-amber-500 hover:amber-600 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">Save Draft</span>
                            </button>
                            <button
                                onClick={generateInvoice}
                                className="group bg-emerald-500 hover:emerald-600 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">Create Invoice</span>
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                className="group bg-indigo-500 hover:indigo-600 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">Download PDF</span>
                            </button>

                        </div>

                        {/* Saved Invoices Count - COMPLETION */}
                        {savedInvoices.length > 0 && (
                            <div className="bg-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-600 rounded-xl p-3">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-green-800">Saved Invoices</h4>
                                        <p className="text-green-600 text-sm mt-1">
                                            📋 {savedInvoices.length} invoice(s) saved in this session
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}