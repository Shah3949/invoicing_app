import React, { useState } from 'react';
import { Search, Edit3, Trash2, Package, DollarSign, Barcode, Tag } from 'lucide-react';

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Premium Widget',
            sku: 'PW-001',
            category: 'Electronics',
            price: 299.99,
            stock: 45,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Standard Service',
            sku: 'SS-002',
            category: 'Services',
            price: 150.00,
            stock: 0,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Basic Package',
            sku: 'BP-003',
            category: 'Packages',
            price: 89.99,
            stock: 23,
            status: 'Active'
        },
        {
            id: 4,
            name: 'Pro Software License',
            sku: 'PSL-004',
            category: 'Software',
            price: 499.99,
            stock: 100,
            status: 'Active'
        }
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        status: 'Active'
    });

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.sku && newProduct.price) {
            setProducts([...products, {
                ...newProduct,
                id: products.length + 1,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock) || 0
            }]);
            setNewProduct({
                name: '',
                sku: '',
                category: '',
                price: '',
                stock: '',
                status: 'Active'
            });
            setShowAddModal(false);
        }
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const totalProducts = products.length;
    const lowStockProducts = products.filter(product => product.stock < 10 && product.stock > 0).length;

    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                        <p className="text-gray-600 mt-1">Manage your product inventory and pricing</p>
                    </div>

                </div>
            </div>

            {/* Stats Cards */}
            <div className="px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{totalProducts}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Package className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">${totalValue.toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <DollarSign className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{lowStockProducts}</p>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <Tag className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Categories</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{[...new Set(products.map(p => p.category))].length}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Barcode className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products by name, SKU, or category..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-6 font-medium text-gray-700">Product Name</th>
                                    <th className="text-left py-3 px-6 font-medium text-gray-700">Price</th>
                                    <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900">${product.price.toFixed(2)}</td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                >
                                                    <Trash2 size={16} />
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

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={newProduct.sku}
                                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;