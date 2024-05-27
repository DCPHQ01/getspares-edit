import React, { useState } from 'react';

function Index({inStock, outOfStock}: {inStock: string, outOfStock: string}) {
    const [activeTab, setActiveTab] = useState<'inStock' | 'outOfStock'>('inStock');

    return (
        <>
            <div className="flex gap-3 text-[#4B5565] border-b-[#4B5565]">
                <button
                    className={`focus:outline-none ${activeTab === 'inStock' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                    onClick={() => setActiveTab('inStock')}
                >
                    In stock({inStock})
                </button>
                <button
                    className={`focus:outline-none ${activeTab === 'outOfStock' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                    onClick={() => setActiveTab('outOfStock')}
                >
                    Out of stock({outOfStock})
                </button>
            </div>
        </>
    );
}

export default Index;
