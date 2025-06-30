import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Download, Filter, MoreVertical } from 'lucide-react';

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample invoice data
  const [invoices] = useState([
    {
      id: 'INV-001',
      client: 'Acme Corporation',
      amount: 2500.00,
      status: 'paid',
      dueDate: '2025-01-15',
      issueDate: '2024-12-15',
      items: 3
    },
    {
      id: 'INV-002',
      client: 'Tech Solutions Ltd',
      amount: 1850.00,
      status: 'pending',
      dueDate: '2025-02-01',
      issueDate: '2025-01-01',
      items: 2
    },
    {
      id: 'INV-003',
      client: 'Digital Marketing Co',
      amount: 3200.00,
      status: 'overdue',
      dueDate: '2024-12-30',
      issueDate: '2024-11-30',
      items: 5
    },
    {
      id: 'INV-004',
      client: 'StartUp Inc',
      amount: 950.00,
      status: 'draft',
      dueDate: '2025-02-15',
      issueDate: '2025-01-15',
      items: 1
    },
    {
      id: 'INV-005',
      client: 'Enterprise Systems',
      amount: 4750.00,
      status: 'paid',
      dueDate: '2025-01-10',
      issueDate: '2024-12-10',
      items: 7
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Create Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Total Invoices</h3>
            <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
            <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Paid</h3>
            <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Issue Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{invoice.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{invoice.client}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">${invoice.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {invoice.items} items
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                        title="View Invoice"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Invoice"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                        title="Download Invoice"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Invoice"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
                        title="More Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No invoices found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredInvoices.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInvoices.length}</span> of{' '}
            <span className="font-medium">{filteredInvoices.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;