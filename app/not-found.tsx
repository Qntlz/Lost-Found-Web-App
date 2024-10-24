import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (

        <div className="flex flex-col justify-center min-h-screen bg-gray-100">
            <div className="md: mb-14">
                <div className="flex justify-center">
                    <FaceFrownIcon className="w-10" />
                </div>
                <h1 className="text-3xl font-bold text-red-500 text-center">Page Not Found</h1>
                <p className="mt-4 text-gray-600 text-center break-words">
                    Sorry, the page you are looking for does not exist.
                </p>
            </div>
        </div>

    );
}
