import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AddPostProps {
  onClose: () => void;
}

export default function AddPost({ onClose }: AddPostProps) {
  const [object, setObject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    // Add Firebase code here to persist the post data
    // For example:
    // await firebase.addPost({ object, description, location });
    
    // Reset form fields and close modal
    setObject('');
    setDescription('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-lg">
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
            value={object}
            onChange={(e) => setObject(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
