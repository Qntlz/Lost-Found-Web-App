"use client";

import React, { useState } from "react";
import { updateProfile } from "firebase/auth"; // Firebase auth for updating user data
import { auth, storage } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { PencilIcon, CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(true); // State to control modal visibility
  const [editName, setEditName] = useState(false); // State to toggle name editing
  const [newName, setNewName] = useState(""); // Store new name
  const [profilePic, setProfilePic] = useState<string | null>(null); // Store profile picture URL
  const [previewPic, setPreviewPic] = useState<string | null>(null); // Preview before upload
  const [uploadError, setUploadError] = useState<string | null>(null); // Store errors
  const [isUploading, setIsUploading] = useState(false); // Upload state

  const currentUser = auth.currentUser; // Get current user details

  // Handle profile picture upload
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size <= 15 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadError("File size must be below 15MB");
    }
  };

  // Save changes to Firebase
  const handleSaveChanges = async () => {
    setIsUploading(true);
    const updates: any = {};

    if (newName) {
      updates.displayName = newName;
    }

    if (previewPic && currentUser) {
      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, previewPic as any);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setUploadError(error.message);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updates.photoURL = downloadURL;
          await updateProfile(currentUser, updates);
          setProfilePic(downloadURL);
          setIsUploading(false);
          setIsOpen(false); // Close modal on success
        }
      );
    }
    if (currentUser && newName) {
      await updateProfile(currentUser, { displayName: newName });
    }
  };

  return (
      <div className="relative">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="mt-4 flex items-center">
            <div className="relative">
              <Image
                src={profilePic || "/default-avatar.png"} // Default if no profile pic
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0">
                <CameraIcon className="w-6 h-6 cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                />
              </label>
            </div>

            {/* Preview Section */}
            {previewPic && (
              <div className="ml-4">
                <Image
                  src={previewPic}
                  alt="Profile Picture Preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Name Section */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newName || currentUser?.displayName || ""}
              onChange={(e) => setNewName(e.target.value)}
              disabled={!editName}
              className={`border p-2 rounded-lg ${editName ? "bg-white" : "bg-gray-200"}`}
            />
            <PencilIcon
              className="w-6 h-6 ml-2 cursor-pointer"
              onClick={() => setEditName(!editName)}
            />
          </div>

          {/* Email Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={currentUser?.email || ""}
              disabled
              className="border p-2 rounded-lg bg-gray-200 w-full"
            />
          </div>

          {/* Error Message */}
          {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveChanges}
              disabled={isUploading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {isUploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
  );
}
