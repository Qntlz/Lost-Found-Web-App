"use client"

import { auth, db } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export default function EmailDisplay() {
    const [email, setEmail] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUserNameFromFirestore = async (uid: string) => {
        try {
          const userDocRef = doc(db, "users", uid); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setEmail(userData.email || null); // Update the username from Firestore
          } else {
            console.warn("No user document found for UID:", uid);
            setEmail(null);
          }
        } catch (error) {
          console.error("Error fetching username from Firestore:", error);
          setEmail(null);
        }
      };
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchUserNameFromFirestore(user.uid); // Fetch username from Firestore using UID
        } else {
          setEmail(null); // Reset if no user is logged in
        }
      });
  
      return unsubscribe; // Cleanup auth listener on component unmount
    }, []);
  
    return <div>{email || ""}</div>; // Show "Guest" if username is not available
  }
