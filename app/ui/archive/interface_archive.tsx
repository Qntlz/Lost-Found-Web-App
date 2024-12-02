"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArchivePost } from "@/app/lib/definitions";


export default function Archive() {
  const [archivedItems, setArchivedItems] = useState<ArchivePost[]>([]);

  // Example archived posts (for demonstration purposes)
  const exampleArchivedPosts: ArchivePost[] = [
    {
      id: "1",
      itemName: "Lost Phone",
      description: "A black iPhone found near the campus library.",
      status: "Found",
      campus: "Talamban",
      building: "Bunzell",
      tags: ["electronics", "lost item"],
      user: "user1", // User who posted
      submittedAt: new Date(), // Example timestamp for the post (current date)
    },
    {
      id: "2",
      itemName: "Missing Wallet",
      description: "A wallet containing ID and some cash was found near the cafeteria.",
      status: "Found",
      campus: "Talamban",
      building: "SAFAD",
      tags: ["wallet", "missing item"],
      user: "user2", // User who posted
      submittedAt: new Date(), // Example timestamp for the post (current date)
    },
  ];

  // Fetch archived items (replace with actual Firestore fetch logic)
  const fetchArchivedItems = async () => {
    try {
      // Simulating fetching archived posts
      setArchivedItems(exampleArchivedPosts);
    } catch (error) {
      console.error("Error fetching archived items:", error);
    }
  };

  useEffect(() => {
    fetchArchivedItems();
  }, []);

  return (
    <div className="relative ml-16"> {/* Increased left margin */}
      <div className="grid grid-rows-1 lg:grid-cols-5 xl:grid-cols-12 gap-4 p-6">
        {/* Archive Header */}
        <div className="col-span-full">
          <h2 className="text-3xl font-bold mb-6">Archived Items</h2> {/* Adjusted font size */}
        </div>

        {/* Archive Section */}
        <div className="col-span-full lg:col-span-3 xl:col-span-9">
          {archivedItems.length > 0 ? (
            archivedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md mb-6 p-6 mr-8"> {/* Increased margin-right */}
                <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-6">
                  {/* Post Image (Logo) */}
                  <div className="w-full lg:w-2/5 h-56 flex items-center justify-center bg-gray-100 rounded-lg">
                    <Image
                      src="/logo.svg"  // Changed to logo.svg
                      alt="Logo"
                      width={200}       // Adjust width as needed
                      height={200}      // Adjust height as needed
                    />
                  </div>

                  {/* Post Details */}
                  <div className="w-full lg:w-3/5">
                    <h3 className="text-xl font-semibold">{item.itemName}</h3> {/* Adjusted font size */}
                    <p className="text-base text-gray-600 mt-2">{item.description}</p> {/* Adjusted font size */}

                    <div className="mt-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Status: {item.status}</span>
                        <span className="text-sm text-gray-500">Campus: {item.campus}</span>
                        <span className="text-sm text-gray-500">Building: {item.building}</span>
                      </div>

                      {/* Displaying the user's name */}
                      <div className="mt-2 text-sm text-gray-500">
                        <span>Posted by: {item.user}</span> {/* User who posted */}
                      </div>

                      <div className="mt-2 flex flex-wrap">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-black bg-transparent border border-[#f87171] rounded-full py-1 px-3 mr-2 mb-2 text-sm" // Tag text black, background transparent with #f87171 border
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Post Timestamp */}
                    <div className="mt-4 text-sm text-gray-500">
                      <span>Archived on: {item.submittedAt.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No archived posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}