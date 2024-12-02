// src/app/CreateAnnouncement.tsx
"use client";

import React, { useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateAnnouncement() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "allAnnouncement"), {
        title,
        body,
        date_added: new Date(),
        visibility: 'public',
        active: true,
      });
      alert('Announcement created successfully!');
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  // Styles for centering the form
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    flexDirection: 'column',
  };

  const formStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '300px', // Fixed width for the form
  };

  return (
    <div className="bg-white ml-7 mt-5 pt-4">
      <h2 className="text-4xl font-semibold mb-10 text-red-600">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xl font-medium mb-1">Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
        >
          Submit
        </button>
      </form>
    </div>
  ) 
};
