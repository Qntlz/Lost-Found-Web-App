"use client"

import { inter } from "../fonts";
import { useState } from "react";
import FeedHeader  from "./feed-header";
import Posts from "./feed-content";
import { user, Post } from "@/app/lib/definitions";

export default function Feed(){

  const [items, setItems] = useState<Post[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("Missing");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [userList, setUserList] = useState<user[]>([]);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  return(
    <div className={`${inter.className}`}>
      < FeedHeader showFilters={showFilters} selectedStatus={selectedStatus}
        selectedCampus={selectedCampus} selectedBuilding={selectedBuilding} 
        setSelectedStatus={setSelectedStatus} setSelectedCampus={setSelectedCampus} 
        setSelectedBuilding={setSelectedBuilding} setShowFilters={setShowFilters}/>

      <div className={`overflow-y-scroll no-scrollbar ${showFilters ? "h-[60vh] mt-5" : "h-[70vh]"}`}>
        < Posts userList={userList} selectedStatus={selectedStatus}
          selectedCampus={selectedCampus} selectedBuilding={selectedBuilding} 
          items={items} showFilters={showFilters} setItems={setItems} 
          setUserList={setUserList} />
      </div>

    </div>
  );
}