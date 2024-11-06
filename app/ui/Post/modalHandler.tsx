'use client'

import { useEffect, useState } from 'react';
import AddPostModal from './addPostModal';

export default function ModalHandler() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    window.addEventListener('openAddPostModal', openModal);
    window.addEventListener('closeAddPostModal', closeModal);

    return () => {
      window.removeEventListener('openAddPostModal', openModal);
      window.removeEventListener('closeAddPostModal', closeModal);
    };
  }, []);

  if (!isModalOpen) return null;
  return <AddPostModal onClose={() => setIsModalOpen(false)} />;
}
