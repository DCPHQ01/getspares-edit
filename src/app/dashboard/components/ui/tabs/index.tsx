import React, { useState } from 'react';

function Index({ tabs }: { tabs: { label: string, count: string }[] }) {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    return (
        <div className={`border-b border-[#EEF2F6] inline-block`}>
            <div className="flex gap-3 text-[#4B5565]">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`mx-[0.5rem] focus:outline-none ${activeTab === tab.label ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}({tab.count})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Index;
