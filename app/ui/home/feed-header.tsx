"use client"

import { inter } from "../fonts";
import Link from "next/link";
import { useState } from "react";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Feed } from "@/app/lib/definitions";


export default function FeedHeader({
  showFilters, selectedStatus,
  selectedBuilding, selectedCampus,
  setSelectedStatus, setSelectedCampus,
  setSelectedBuilding, setShowFilters
}: Feed) {
  return (
    <div className="flex flex-row justify-between mx-4 pb-2 pt-3 lg:pt-8 xl:pt-12 xl:mx-0">

    <div className="flex w-full justify-between mt-20 md:mt-5 xl:mt-0">
      {/* Filter & Add Item Buttons */}
      <div className="flex h-8 p-1 mt-2 mr-3 rounded-md border justify-self-end border-red-500 text-red-500 order-2 xl:mr-10">
        <Link href={'/post/make'} className="flex font-normal text-sm text-nowrap items-center">
          <PlusIcon className="mx-1 w-5" />
          Add Item
        </Link>
      </div>
      <div className="flex text-gray-400">
        {/* Funnel Icon */}
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="p-2 pl-0 flex items-center"
        >
          <AdjustmentsHorizontalIcon className="w-8 h-8" />
        </button>
      </div>
    </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="w-full absolute top-36 left-0 p-4 py-2 flex flex-wrap gap-4 bg-white md:top-30 lg:top-44 lg:left-52 xl:top-40 xl:left-60 2xl:left-[305px]">
          <div className="flex gap-2">

            <select
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"
            >
              <option value="Missing">Missing</option>
              <option value="Found">Found</option>
              <option value="All">All Status</option>
            </select>

            <select
              onChange={(e) => setSelectedCampus(e.target.value)}
              value={selectedCampus}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"

            >
              <option value="All">All Campus</option>
              <option value="Main">Main</option>
              <option value="Talamban">Talamban</option>
              {/* Add more campuses as needed */}
            </select>
            <select
              onChange={(e) => setSelectedBuilding(e.target.value)}
              value={selectedBuilding}
              className="p-2 text-xs sm:text-base bg-transparent border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent"
            >
              <option value="All">All Buildings</option>
              <option value="Bunzell">Bunzell</option>
              <option value="Chapel">Chapel</option>
              <option value="Dormitory">Dormitory</option>
              <option value="MR">MR</option>
              <option value="PE">PE</option>
              <option value="RH">RH</option>
              <option value="SAFAD">SAFAD</option>
              <option value="SMED">SMED</option>
              <option value="Wing 1">Wing 1</option>
              <option value="Wing 2">Wing 2</option>
              <option value="Wing 3">Wing 3</option>
              {/* Add more buildings as needed */}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}