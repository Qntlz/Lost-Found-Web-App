"use client";

import { useState } from "react";
import SideNav from '../home/Sidenav';
import {
  MagnifyingGlassIcon,
  BellAlertIcon,
  Bars3Icon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { playfairDisplay } from '../fonts';

type Item = {
  id: number;
  title: string;
  tags: string[];
  status: string;
  type: string;
  color: string;
  place: string;
  date: string;
};

const Header: React.FC = () => {

  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Filter states with default "All"
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");

  const items: Item[] = [
    { id: 1, title: "Red Aquaflask", tags: ["red", "aquaflask"], status: "Found", type: "Bottle", color: "Red", place: "LRC", date: "2024-08-07" },
    { id: 2, title: "Blue Backpack", tags: ["blue", "backpack"], status: "Lost", type: "Bag", color: "Blue", place: "Bunzel", date: "2024-9-15" },
    { id: 3, title: "Green Umbrella", tags: ["green", "umbrella"], status: "Found", type: "Umbrella", color: "Green", place: "Canteen", date: "2024-10-02" },
  ];

  const filteredItems = items.filter(item => {
    const matchesQuery = item.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesColor = selectedColor === "All" || item.color === selectedColor;
    const matchesPlace = selectedPlace === "All" || item.place === selectedPlace;
    const matchesDate = selectedDate === "All" || item.date === selectedDate;

    return (
      matchesQuery &&
      matchesStatus &&
      matchesType &&
      matchesColor &&
      matchesPlace &&
      matchesDate
    );
  });

  const clearFilters = () => {
    setSelectedStatus("All");
    setSelectedType("All");
    setSelectedColor("All");
    setSelectedPlace("All");
    setSelectedDate("All");
  };

  return (
    <div className="relative">
      <header className="fixed top-0 w-full z-20 bg-white p-4 border-b-2">
        <div className="grid grid-cols-2 md:grid-cols-7 w-full">
          {/* Left: Logo */}
          <div className="flex w-full items-center">
            <div className="flex items-center">
              <button onClick={() => setShowNav(!showNav)}>
                <Bars3Icon className="w-7 mr-2 mt-2 text-gray-500 cursor-pointer" />
              </button>
              <span className={`${playfairDisplay.className} font-semibold text-red-500 text-xl text-nowrap`}>
                LOST & FOUND
              </span>
            </div>
          </div>

          {/* Center: Search Bar with Filter Icon */}
          <div className="order-last col-span-2 md:col-span-4 md:col-start-3 min-w-full">
            {showSearch && (
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  placeholder="Search by tags (e.g., red, aquaflask)"
                  className="mt-1 p-1 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setShowFilter(!showFilter)} className="ml-2">
                  <FunnelIcon className="w-6 text-gray-500 cursor-pointer" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Notifications */}
          <div className="flex justify-self-end md:order-last">
            <button onClick={() => setShowSearch(!showSearch)}>
              <MagnifyingGlassIcon className="w-6 text-red-500 cursor-pointer" />
            </button>
            <button>
              <BellAlertIcon className="w-6 text-red-500 transition duration-0 hover:duration-150 hover:scale-110" />
            </button>
          </div>
        </div>

        <SideNav show={showNav} closeNav={() => setShowNav(!showNav)} />
      </header>

      {/* Filter Dropdowns */}
      {showFilter && (
        <div className="absolute top-16 right-0 mt-2 w-72 bg-white shadow-md border rounded-lg p-4 z-10">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Clear All Button */}
          <button onClick={clearFilters} className="text-blue-500 font-semibold text-sm mb-4">
            Clear All Filters
          </button>

          {/* Filter Section */}
          {[
            { label: "Status", options: ["All", "Found", "Lost"], selected: selectedStatus, setSelected: setSelectedStatus },
            { label: "Type", options: ["All", "Bottle", "Bag", "Umbrella"], selected: selectedType, setSelected: setSelectedType },
            { label: "Color", options: ["All", "Red", "Blue", "Green"], selected: selectedColor, setSelected: setSelectedColor },
            { label: "Place", options: ["All", "LRC", "Bunzel", "Canteen"], selected: selectedPlace, setSelected: setSelectedPlace },
            { label: "Date", options: ["All", "2024-08-07", "2024-9-15", "2023-10-02"], selected: selectedDate, setSelected: setSelectedDate },
          ].map(({ label, options, selected, setSelected }) => (
            <div key={label} className="mt-2">
              <p className="text-gray-700 font-semibold">{label}: <span className="text-blue-500">{selected}</span></p>
              <ul className="border border-gray-200 rounded-lg mt-1">
                {options.map(option => (
                  <li
                    key={option}
                    className={`cursor-pointer p-2 ${selected === option ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelected(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="mt-16 p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li key={item.id} className="border-b border-gray-300 py-2">
                  {item.title}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
