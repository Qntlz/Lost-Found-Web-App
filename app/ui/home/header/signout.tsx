import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Replace with your Firebase config path

export default async function LogoutButton() {
    try {
        await signOut(auth); // Log out the user
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error);
    }

};

