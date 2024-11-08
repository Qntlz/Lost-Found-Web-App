// app/ui/post/MyPost.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig'; // Adjust the import path for your firebase config
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface PostData {
  id: string;
  object: string;
  description: string;
  location: string;
  createdAt: Date;
  status: 'Found' | 'Not Found'; // Add status field
}

export default function MyPost() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const fetchedPosts: PostData[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            object: data.object,
            description: data.description,
            location: data.location,
            createdAt: data.createdAt.toDate(),
            status: data.status || 'Not Found', // Ensure status field is fetched
          };
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'Found' | 'Not Found') => {
    try {
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, {
        status: newStatus,
      });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          There are no posts.
        </div>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            className="bg-[#eba4a4] p-4 rounded-lg shadow-lg w-[800px] max-w-xl mx-auto"
          >
            <h2 className="text-lg font-semibold">{post.object}</h2>
            <p className="text-gray-500">{post.createdAt.toLocaleString()}</p>
            <p className="mt-2">{post.description}</p>
            <p className="mt-2 text-gray-700">Location: {post.location}</p>
            <p className="mt-2">Status: {post.status}</p>

            {/* Update Status */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleUpdateStatus(post.id, 'Found')}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Mark as Found
              </button>
              <button
                onClick={() => handleUpdateStatus(post.id, 'Not Found')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              >
                Mark as Not Found
              </button>
            </div>

            {/* Delete Post */}
            <button
              onClick={() => handleDeletePost(post.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Post
            </button>
          </div>
        ))
      )}
    </div>
  );
}
