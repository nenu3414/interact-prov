import React, { useState } from "react";

const tabs = [
  "About",
  "Related Peoples, Orgs & Works",
  "Structure",
  "Space and Time",
  "Software and Hardware",
  "Others",
];

export default function TabBar() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col w-max">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === tabs[0] && <div>About Content</div>}
        {activeTab === tabs[1] && (
          <div>Related Peoples, Orgs and Works Content</div>
        )}
        {activeTab === tabs[2] && <div>Structure Content</div>}
        {activeTab === tabs[3] && <div>Space and Time Content</div>}
        {activeTab === tabs[4] && <div>Software and Hardware Content</div>}
        {activeTab === tabs[5] && <div>Others Content</div>}
      </div>
    </div>
  );
}
