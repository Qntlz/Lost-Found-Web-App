"use client"

import clsx from "clsx";
import React, { useState } from 'react';
import {
    Select, Field, Description, Label,
    Fieldset, Legend, Input, Textarea
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function LostItemForm() {
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showCollections, setShowCollections] = useState(false);
    const [showCommonItems, setShowCommonItems] = useState(false);

    const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCampus(event.target.value);
        setBuilding(''); // reset building when campus changes
    };

    const handleBuildingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuilding(event.target.value);
    };

    const handleTagSelection = (tag: string) => {
        // console.log("Clicked tag:", tag);
    
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                // console.log("Removing tag:", tag);
                // Remove tag if already selected
                return prevTags.filter((t) => t !== tag);
            } else {
                // console.log("Adding tag:", tag);
                // Add tag if not already selected
                return [...prevTags, tag];
            }
        });
    };

    return (
        <div>
            <form action="" className="space-y-4 w-full max-w-lg">
                <Fieldset className="space-y-3 rounded-xl bg-white/5">

                    {/* Item Field */}
                    <Legend className="text-lg font-semibold text-black">Item details</Legend>
                    <Field>
                        <Label className="text-sm/6 font-medium text-black">Item Name:</Label>
                        <Input
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />
                    </Field>

                    {/* Campus Field */}
                    <Field>
                        <Label className="text-sm/6 font-medium text-black">Campus</Label>
                        <Description className="text-sm/6 text-black/50">Pick which campus it was last seen</Description>
                        <div className="relative">
                            <Select onChange={handleCampusChange}
                                className={clsx(
                                    'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
                                    // Make the text of each option black on Windows
                                    '*:text-black'
                                )}
                            >
                                <option value={"Main"}>Main Campus</option>
                                <option value={"Talamban"}>Talamban Campus</option>
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>

                    {/* Building Field */}
                    <div>
                        {campus && (
                            <Field>
                                <Label className="text-sm/6 font-medium text-black">Building</Label>
                                <Select value={building} onChange={handleBuildingChange}
                                    className={clsx(
                                        'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
                                        // Make the text of each option black on Windows
                                        '*:text-black'
                                    )}
                                >
                                    <option value="">Select Building:</option>
                                    {campus === 'Main' ? (
                                        <>
                                            <option value="Wing1">Wing1</option>
                                            <option value="Wing2">Wing2</option>
                                            <option value="Wing3">Wing3</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="Bunzell">Bunzell</option>
                                            <option value="SMED">SMED</option>
                                            <option value="PE">PE</option>
                                            <option value="RH">RH</option>
                                            <option value="LRC">LRC</option>
                                            <option value="SAFAD">SAFAD</option>
                                            <option value="Chapel">Chapel</option>
                                        </>
                                    )}
                                </Select>
                            </Field>
                        )}
                    </div>

                    {/* Description Field */}
                    <Field>
                        <Label className="text-sm/6 font-medium text-black">Addtional Information</Label>
                        <Description className="text-sm/6 text-black/50">
                            Any information that can help identify your lost item.
                        </Description>
                        <Textarea
                            className={clsx(
                                'mt-3 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                            rows={4}
                        />
                    </Field>

                    {/* Tags Field */}
                    <Field>
                        <Label className="text-sm/6 font-medium text-black">Tags</Label>
                        <Description className="text-sm/6 text-black/50">
                            Select tags to help describe your item.
                        </Description>

                        {/* Colors Category */}
                        <div className="mt-3">
                            <button
                                type="button"
                                className="text-sm font-medium text-black"
                            >
                                Colors
                            </button>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {["Blue", "Teal", "Mint", "Green", "Sage", "Yellow", "Beige", "Brown", "Orange", "Peach", "Red", "Maroon", "Pink", "Purple", "Navy", "Black", "Grey", "White"].map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300`}
                                        onClick={() => handleTagSelection(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Collections Category */}
                        <div className="mt-3">
                            <button
                                type="button"
                                className="text-sm font-medium text-black"
                                onClick={() => setShowCollections(!showCollections)}
                            >
                                Collections
                            </button>
                            {showCollections && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {["Pastel", "Vintage", "Retro", "Neon", "Gold", "Light", "Dark", "Warm", "Cold", "Summer", "Fall", "Winter", "Spring", "Happy", "Nature", "Earth", "Night", "Space", "Rainbow", "Gradient", "Sunset", "Sky", "Sea", "Kids", "Skin", "Food", "Cream", "Coffee", "Wedding", "Christmas", "Halloween"].map(collection => (
                                        <button
                                            key={collection}
                                            type="button"
                                            className="px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300"
                                            onClick={() => handleTagSelection(collection)}
                                        >
                                            {collection}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Common Items */}
                        <div className="mt-3">
                            <button
                                type="button"
                                className="text-sm font-medium text-black"
                                onClick={() => setShowCommonItems(!showCommonItems)}
                            >
                                Common Items
                            </button>
                            {showCommonItems && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {["Smartphone", "Tablet", "Smartwatch", "Wallet", "Earbuds"].map(item => (
                                        <button
                                            key={item}
                                            type="button"
                                            className="px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300"
                                            onClick={() => handleTagSelection(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Field>
                </Fieldset>
            </form>
        </div>
    );
};

