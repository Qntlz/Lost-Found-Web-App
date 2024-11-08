'use client'
import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface AddPostModalProps {
  onClose: () => void;
}

export default function AddPostModal({ onClose }: AddPostModalProps) {
  const [object, setObject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    if (object && description && location) {
      try {
        // Save the post to Firestore
        await addDoc(collection(db, 'posts'), {
          object,
          description,
          location,
          createdAt: new Date(),
        });
        onClose(); // Close the modal after submitting
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('Please fill all fields!');
    }
  };

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
            value={object}
            onChange={(e) => setObject(e.target.value)}
            placeholder="Object"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-md"
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
