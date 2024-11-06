'use client'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AddPostModalProps {
  onClose: () => void;
}

export default function AddPostModal({ onClose }: AddPostModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg h-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Post</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Object"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
