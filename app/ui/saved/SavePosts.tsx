// app/ui/saved/SavePosts.tsx

'use client';

import React from 'react';

const SavePosts = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold">Saved Posts</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Lost Phone</h2>
        <p>A black iPhone found near the campus library.</p>
        <span className="text-sm text-gray-500">Status: Found</span>
      </div>
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Missing Wallet</h2>
        <p>A wallet containing ID and some cash was found near the cafeteria.</p>
        <span className="text-sm text-gray-500">Status: Found</span>
      </div>
    </div>
  );
};

export default SavePosts;
