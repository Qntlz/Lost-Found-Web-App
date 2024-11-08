import Link from "next/link";
import { inter } from "../fonts";
import LostItemForm from "./LostItemForm";
import { Button } from "@headlessui/react";
import DisplayProfile from "@/app/lib/getProfile";
import UsernameDisplay from "@/app/lib/getUsername";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function MakePost() {
    return (
        <div className={`${inter.className}flex flex-col mt-20`}>

            {/* Header */}
            <div className="flex flex-row justify-between mx-5 p-5 pl-0">   
                {/* Create Post */}
                <div className="flex gap-2">
                    <div className="w-5 pt-2">
                        <Link href={'/home'}>
                            < ArrowLeftIcon />
                        </Link>
                    </div>
                    <span className="text-2xl font-normal text-red-500">Create Post</span>
                </div>

                {/* Post Button */}
                <Button className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-red-600">
                    POST
                </Button>
            </div>

            <div className="mx-5 p-5 border-t-2">

                {/* Profile Picture & Username */}
                <div className="flex flex-row gap-3 p-2 mb-5">
                    <div className="">
                        < DisplayProfile />
                    </div>
                    <div className="text-2xl">
                        < UsernameDisplay />
                        <span>BSCS - 1</span>
                    </div>
                </div>

                {/* Post Form */}
                <div>
                    < LostItemForm />
                </div>

            </div>
        </div>
    );
}