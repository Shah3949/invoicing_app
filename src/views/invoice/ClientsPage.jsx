import React, { useState } from 'react';
import { ArrowLeft, Users, FileText, DollarSign, Phone, Mail, MapPin, Building, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ClientsPage = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'invoices'
    const [selectedClient, setSelectedClient] = useState(null);

    // Sample client data
    const clients = [
        {
            id: 1,
            name: 'Acme Corporation',
            email: 'contact@acme.com',
            phone: '+1 (555) 123-4567',
            address: '123 Business St, New York, NY 10001',
            company: 'Acme Corporation',
            contactPerson: 'John Smith',
            totalInvoices: 15,
            totalAmount: 45750.00,
            pendingAmount: 12300.00,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Tech Solutions Ltd',
            email: 'info@techsolutions.com',
            phone: '+1 (555) 987-6543',
            address: '456 Innovation Ave, San Francisco, CA 94105',
            company: 'Tech Solutions Ltd',
            contactPerson: 'Sarah Johnson',
            totalInvoices: 8,
            totalAmount: 28900.00,
            pendingAmount: 5400.00,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Global Enterprises',
            email: 'billing@globalent.com',
            phone: '+1 (555) 456-7890',
            address: '789 Corporate Blvd, Chicago, IL 60601',
            company: 'Global Enterprises',
            contactPerson: 'Michael Brown',
            totalInvoices: 22,
            totalAmount: 67200.00,
            pendingAmount: 0.00,
            status: 'Active'
        }
    ];

    // Sample invoice data for clients
    const clientInvoices = {
        1: [
            { id: 'INV-001', date: '2024-06-15', dueDate: '2024-07-15', amount: 2500.00, status: 'Paid' },
            { id: 'INV-005', date: '2024-06-20', dueDate: '2024-07-20', amount: 3200.00, status: 'Pending' },
            { id: 'INV-008', date: '2024-06-25', dueDate: '2024-07-25', amount: 1800.00, status: 'Overdue' },
            { id: 'INV-012', date: '2024-06-28', dueDate: '2024-07-28', amount: 4500.00, status: 'Paid' }
        ],
        2: [
            { id: 'INV-003', date: '2024-06-18', dueDate: '2024-07-18', amount: 1900.00, status: 'Paid' },
            { id: 'INV-007', date: '2024-06-22', dueDate: '2024-07-22', amount: 2700.00, status: 'Pending' },
            { id: 'INV-011', date: '2024-06-26', dueDate: '2024-07-26', amount: 3300.00, status: 'Paid' }
        ],
        3: [
            { id: 'INV-002', date: '2024-06-16', dueDate: '2024-07-16', amount: 5200.00, status: 'Paid' },
            { id: 'INV-004', date: '2024-06-19', dueDate: '2024-07-19', amount: 2800.00, status: 'Paid' },
            { id: 'INV-006', date: '2024-06-21', dueDate: '2024-07-21', amount: 4100.00, status: 'Paid' },
            { id: 'INV-009', date: '2024-06-24', dueDate: '2024-07-24', amount: 3700.00, status: 'Paid' }
        ]
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Paid': return <CheckCircle className="w-4 h-4" />;
            case 'Pending': return <Clock className="w-4 h-4" />;
            case 'Overdue': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const handleClientSelect = (client) => {
        setSelectedClient(client);
        setCurrentView('detail');
    };

    const handleViewInvoices = (client) => {
        setSelectedClient(client);
        setCurrentView('invoices');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Clients List View
    if (currentView === 'list') {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                                <p className="text-gray-600">Manage your client relationships</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Stats Cards */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                                    <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(clients.reduce((sum, client) => sum + client.totalAmount, 0))}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Pending Amount</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {formatCurrency(clients.reduce((sum, client) => sum + client.pendingAmount, 0))}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Invoices</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {clients.reduce((sum, client) => sum + client.totalInvoices, 0)}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clients Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">All Clients</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoices</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clients.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Building className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                        <div className="text-sm text-gray-500">{client.contactPerson}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{client.email}</div>
                                                <div className="text-sm text-gray-500">{client.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{client.totalInvoices}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{formatCurrency(client.totalAmount)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-sm font-medium ${client.pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                                                    {formatCurrency(client.pendingAmount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {client.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleClientSelect(client)}
                                                        className="text-green-600 hover:text-green-900 transition-colors"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewInvoices(client)}
                                                        className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    >
                                                        Invoices
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Client Detail View
    if (currentView === 'detail') {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setCurrentView('list')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Building className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h1>
                                    <p className="text-gray-600">Client Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleViewInvoices(selectedClient)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                <span>View Invoices</span>
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                                <FileText className="w-4 h-4" />
                                <span>Create Invoice</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Client Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Building className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Company Name</p>
                                                <p className="text-gray-900">{selectedClient.company}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Contact Person</p>
                                                <p className="text-gray-900">{selectedClient.contactPerson}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <p className="text-gray-900">{selectedClient.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="text-gray-900">{selectedClient.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Address</p>
                                                <p className="text-gray-900">{selectedClient.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-gray-600">Total Invoices</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{selectedClient.totalInvoices}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-600">Total Amount</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{formatCurrency(selectedClient.totalAmount)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <span className="text-gray-600">Pending Amount</span>
                                        </div>
                                        <span className={`font-semibold ${selectedClient.pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                                            {formatCurrency(selectedClient.pendingAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Client Invoices View
    if (currentView === 'invoices') {
        const invoices = clientInvoices[selectedClient.id] || [];
        const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setCurrentView('detail')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Invoices for {selectedClient.name}</h1>
                                    <p className="text-gray-600">{invoices.length} invoices • Total: {formatCurrency(totalAmount)}</p>
                                </div>
                            </div>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                            <FileText className="w-4 h-4" />
                            <span>Create Invoice</span>
                        </button>
                    </div>
                </div>

                {/* Invoice Stats */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Invoices</p>
                                    <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Paid</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {invoices.filter(inv => inv.status === 'Paid').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Pending</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {invoices.filter(inv => inv.status !== 'Paid').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoices Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generate Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(invoice.date)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                                    <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                                        View
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                                        Download
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ClientsPage;