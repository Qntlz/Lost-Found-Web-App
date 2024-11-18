import Link from "next/link";
import { inter } from "../fonts";
import LostItemForm from "./LostItemForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function MakePost() {

    return (
        <div className={`${inter.className}flex flex-col mt-20 `}>

            {/* Header */}
            <div className="flex flex-row justify-between mx-5 p-5 pl-0">   
                {/* Create Post */}
                <div className="flex gap-2">
                    <div className="w-5 pt-2">
                        <Link href={'/home'}>
                            < ArrowLeftIcon />
                        </Link>
                    </div>
                    <span className="text-2xl font-normal text-red-500">Report Lost Item</span>
                </div>
            </div>

            {/* Contents */}
            <div className="mx-5 p-5 border-t-2">
                {/* Post Form */}
                <div>
                    < LostItemForm />
                </div>
            </div>
        </div>
    );
}