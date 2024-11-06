"use client";

import { PlusIcon } from '@heroicons/react/24/outline';

export default function AddPostButton() {
  const openAddPostModal = () => {
    const event = new CustomEvent('openAddPostModal');
    window.dispatchEvent(event);
  };

  return (
    <div className="p-1 rounded-md border border-red-500 text-red-500">
      <button className="flex font-normal text-sm text-nowrap items-center" onClick={openAddPostModal}>
        <PlusIcon className="mx-1 w-5" />
        Add Post
      </button>
    </div>
  );
}
