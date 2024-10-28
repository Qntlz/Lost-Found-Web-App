import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Log out the user
            console.log("User signed out successfully.");
            router.push('/'); // Redirect to the landing page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <button
            className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start"
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
}
