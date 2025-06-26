import React from 'react';
import { Edit2, X } from 'lucide-react';
import PropTypes from 'prop-types';



const BillToPopUp = ({ invoiceData, handleInputChange, setShowBillToPopup }) => {
    BillToPopUp.propTypes = {
        invoiceData: PropTypes.shape({
            billTo: PropTypes.shape({
                name: PropTypes.string,
                phone: PropTypes.number,
                address: PropTypes.string,
                city: PropTypes.string,
                country: PropTypes.string,
                gstin: PropTypes.string,
            }).isRequired
        }).isRequired,

        handleInputChange: PropTypes.func.isRequired,
        setShowBillToPopup: PropTypes.func.isRequired
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-[#8bbe14] px-8 py-6 text-white relative">
                    <button
                        onClick={() => setShowBillToPopup(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200 group"
                    >
                        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>

                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Edit2 className="w-6 h-6" />
                        </div>
                        Bill To
                    </h3>
                    <p className="text-red-100 mt-2 text-sm">Enter customer billing information</p>
                </div>

                {/* Form content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Customer Name', field: 'name', placeholder: 'Enter customer name' },
                            { label: 'Phone Number', field: 'phone', placeholder: 'Enter phone number' },
                            { label: 'Address', field: 'address', placeholder: 'Enter street address' },
                            { label: 'City & State', field: 'city', placeholder: 'City, State, Pincode' },
                            { label: 'Country', field: 'country', placeholder: 'Enter country' },
                            { label: 'GSTIN', field: 'gstin', placeholder: 'Enter GSTIN number' }
                        ].map(({ label, field, placeholder }) => (
                            <div key={field} className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    value={invoiceData.billTo[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value, 'billTo')}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => setShowBillToPopup(false)}
                            className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillToPopUp;
