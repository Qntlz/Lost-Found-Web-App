"use client";

import Image from "next/image";
import { auth, db } from '@/firebaseConfig';
import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import MyPost from "@/app/ui/post/retrieve-post";

export default function Profile() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState<string>("");
    const [uid, setUID] = useState<string | null>(null);
  
    // Fetch user data from Firestore
    useEffect(() => {
      const fetchUserData = async (userUID: string) => {
        try {
          const userDocRef = doc(db, "users", userUID);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || ""); // Retrieve the name
            setEmail(userData.email || ""); // Retrieve the email
          } else {
            console.warn("No user document found for UID:", userUID);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      };
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUID(user.uid);
          fetchUserData(user.uid);
        } else {
          setUID(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    // Toggle edit mode
    const handleEditProfile = () => {
      setIsEditing(true);
      setTempName(name); // Set temporary name to current name for editing
    };
  
    // Cancel edit and revert changes
    const handleCancelEdit = () => {
      setIsEditing(false);
    };
  
    // Save profile changes to Firestore
    const handleSaveChanges = async () => {
      if (!uid) {
        alert("User is not authenticated.");
        return;
      }
  
      try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, { name: tempName });
        setName(tempName); // Update the state with the new name
        setIsEditing(false);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    };
  
    return (
      <div className="flex flex-col mt-20 lg:ml-52 md:flex-row">
        {/* Profile Section */}
        <div className="">
          {/* Profile Picture */}
          <div>
            
            <div className="mt-10 md:mt-16 mx-8">
              <Image
                src="/logo.svg"
                alt="User Avatar"
                width={150}
                height={0}
                className="p-2 rounded-full outline outline-2 outline-gray-500 outline-offset-4"
              />
            </div>
          </div>
  
          {/* Information */}
          <div className="mx-8 mt-5">
            <div>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="border p-2 rounded-md w-1/2 md:w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              ) : (
                <span className="font-semibold text-2xl">{name}</span>
              )}
            </div>
            <div>
              <span className="font-light text-xl">{email}</span>
            </div>
          </div>
  
          {/* Operations */}
          <div className="flex mt-5 mx-8">
            {isEditing ? (
              <div className="flex gap-5">
                <button
                  onClick={handleSaveChanges}
                  className="px-2 rounded-sm outline outline-offset-2 outline-1 outline-green-500 text-green-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-2 rounded-sm outline outline-offset-2 outline-1 outline-red-500 text-red-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditProfile}
                className="flex p-1 rounded-sm outline outline-offset-2 outline-1 outline-red-500 justify-center text-red-500"
              >
                <PencilSquareIcon className="mx-1 w-5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
  
        {/* Post Section */}
        <div className="grow">
          < MyPost />
        </div>
      </div>
    );
  }