import React, { useState } from "react";

const tabs = [
  "About",
  "Related Peoples, Orgs & Works",
  "Structure",
  "Space and Time",
  "Software and Hardware",
  "Others",
];

export default function AddEntity() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [formData, setFormData] = useState<any>({
    about: {
      id: "",
      type: "",
      name: "",
      desc: "",
      doc: "",
    },
    related: {
      peopleOrgsWorks: "",
    },
    structure: {
      schema: "",
      format: "",
    },
    spaceTime: {
      location: "",
      date: "",
    },
    softwareHardware: {
      software: "",
      hardware: "",
    },
    others: {
      notes: "",
    },
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    section: string,
    field: string
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  //   const handleSubmit = (e: { preventDefault: () => void; }) => {
  //     e.preventDefault();
  //     console.log("Form Submitted", formData);
  //     // You can send the form data to your backend or handle it as needed
  //   };
  return (
    <div className="w-full mr-5">
      <h2 className="text-2xl font-semibold">Add Entity</h2>
      <div>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <form onSubmit={(e) => e.preventDefault()} className="pt-4">
          {activeTab === tabs[0] && (
            <div>
              <div className="mb-4 flex">
                <label className="block text-sm font-medium text-gray-700">
                  id
                </label>
                <input
                  type="text"
                  value={formData.about.id}
                  onChange={(e) => handleChange(e, "about", "id")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.about.description}
                  onChange={(e) => handleChange(e, "about", "description")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === tabs[1] && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Related Peoples, Orgs & Works
                </label>
                <input
                  type="text"
                  value={formData.related.peopleOrgsWorks}
                  onChange={(e) =>
                    handleChange(e, "related", "peopleOrgsWorks")
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === tabs[2] && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Schema
                </label>
                <input
                  type="text"
                  value={formData.structure.schema}
                  onChange={(e) => handleChange(e, "structure", "schema")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Format
                </label>
                <input
                  type="text"
                  value={formData.structure.format}
                  onChange={(e) => handleChange(e, "structure", "format")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === tabs[3] && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.spaceTime.location}
                  onChange={(e) => handleChange(e, "spaceTime", "location")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.spaceTime.date}
                  onChange={(e) => handleChange(e, "spaceTime", "date")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === tabs[4] && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Software
                </label>
                <input
                  type="text"
                  value={formData.softwareHardware.software}
                  onChange={(e) =>
                    handleChange(e, "softwareHardware", "software")
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Hardware
                </label>
                <input
                  type="text"
                  value={formData.softwareHardware.hardware}
                  onChange={(e) =>
                    handleChange(e, "softwareHardware", "hardware")
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === tabs[5] && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={formData.others.notes}
                  onChange={(e) => handleChange(e, "others", "notes")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TabBar({ activeTab, setActiveTab }: any) {
  return (
    <div className="flex flex-col w-max">
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
    </div>
  );
}
