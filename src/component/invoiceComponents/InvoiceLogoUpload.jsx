import React, { useState } from 'react';
import { Trash2, Upload } from 'lucide-react';

const InvoiceLogoUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        document.getElementById('hiddenFileInput').click();
    };

    const handleRemoveLogo = () => {
        setImage(null);
        setPreview(null);
    }

    return (
        <div className="lg:col-span-1">

            {!preview ? (
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 
                    relative overflow-hidden cursor-pointer h-64 flex items-center justify-center px-4"
                    onClick={handleClick}
                >
                    <div>
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <button
                            type="button"
                            className="bg-[#8bbe14] text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                        >
                            Select logo to upload
                        </button>
                        <p className="text-gray-500 mt-2">or drag and drop here</p>
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Trash icon in corner */}
                    <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow group"
                    >
                        <Trash2 className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Image stays centered */}
                    <img
                        src={preview}
                        alt="Uploaded Logo"
                        className="object-contain max-h-[200px] max-w-full"
                    />
                </div>

            )}
            <input
                type="file"
                id="hiddenFileInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default InvoiceLogoUpload;
