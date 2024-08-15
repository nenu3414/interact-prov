import React, { useState } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    documentName: string;
    author: string;
    isPublic: boolean;
  }) => void;
}

export function OverlayDialog({ isOpen, onClose, onSave }: OverlayProps) {
  const [documentName, setDocumentName] = useState("");
  const [author, setAuthor] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Document Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Document Name
          </label>
          <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Save as public</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ documentName, author, isPublic })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
