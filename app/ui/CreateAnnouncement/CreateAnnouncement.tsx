// src/app/CreateAnnouncement.tsx
"use client";

import React, { useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateAnnouncement: React.FC = () => {
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
    <div style={containerStyle}>
      <h2>Create Announcement</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: '10px' }} // Full width input
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            required 
            style={{ width: '100%', height: '100px', marginBottom: '10px' }} // Full width textarea
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>Submit</button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;