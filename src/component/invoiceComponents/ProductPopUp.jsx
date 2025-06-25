import React from 'react'
import { Plus, X } from 'lucide-react';

const ProductPopUp = ({ setShowProductForm, newProduct, setNewProduct, addProduct }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative border border-gray-100 overflow-hidden">
                {/* Header with gradient background */}
                <div className="bg-[#8bbe14] px-8 py-6 text-white relative">
                    <button
                        onClick={() => setShowProductForm(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200 group"
                    >
                        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>

                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Plus className="w-6 h-6" />
                        </div>
                        Add New Product
                    </h3>
                    <p className="text-green-100 mt-2 text-sm">Fill in the product details below</p>
                </div>

                {/* Form content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product/service description"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct((prev) => ({ ...prev, description: e.target.value }))
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                value={newProduct.quantity}
                                onChange={(e) =>
                                    setNewProduct((prev) => ({
                                        ...prev,
                                        quantity: parseFloat(e.target.value) || '',
                                    }))
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Rate
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={newProduct.rate}
                                onChange={(e) =>
                                    setNewProduct((prev) => ({
                                        ...prev,
                                        rate: parseFloat(e.target.value) || '',
                                    }))
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Total Amount
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={newProduct.amount}
                                readOnly
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-700 font-semibold cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={addProduct}
                            className="flex-1 sm:flex-none bg-[#8bbe14] text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Product
                        </button>
                        <button
                            onClick={() => setShowProductForm(false)}
                            className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPopUp