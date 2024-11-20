"use client"

import { Select, Field, Description, Label, Fieldset, Legend, Input, Textarea, Button } from "@headlessui/react";
import { ChevronDownIcon, ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import React, { useRef, useState } from 'react';
import { db, auth } from "@/firebaseConfig";
import { useRouter } from 'next/navigation'
import clsx from "clsx";


export default function LostItemForm() {

    const router = useRouter();
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showCollections, setShowCollections] = useState(false);
    const [showCommonItems, setShowCommonItems] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');

    // Handle event change when file is selected
    const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

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

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = auth.currentUser;

        // Check if the user is authenticated
        if (!user) {
            alert("You need to be logged in to submit an item.");
            return;
        }

        try {
            // Define document data 
            const itemData = {
                user: user?.uid,
                campus,
                building,
                itemName,
                description,
                status: "Missing",
                tags: selectedTags,
                imageUrl: selectedFile ? selectedFile.name : null,          // Storing file name for now
                submittedAt: Timestamp.now() // Use Firebase Timestamp
            };

            // Create a subcollection under the user's UID and add a new document
            const userItemsCollection = collection(db, "lostItems", user.uid, "submissions");

            // Reference to the top-level "allSubmissions" collection
            const allSubmissionsRef = collection(db, "allSubmissions");

            await Promise.all([
                await addDoc(userItemsCollection, itemData),
                await addDoc(allSubmissionsRef, itemData)
            ]);
            
            alert("Item saved successfully!");
        } catch (error) {
            console.error("Error saving item:", error);
            alert("Failed to save item");
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
                <Fieldset className="space-y-3 rounded-xl bg-white/5">

                    <div className="lg:flex w-full gap-10">
                        {/* Upload Image Field */}
                        {/* Hidden file input element */}
                        <input type="file" ref={inputRef} onChange={handleFileOnChange} className="hidden" />

                        {/* Button to trigger the file input dialog */}
                        <div className="lg:flex flex-col w-full lg:order-2 gap-y-5">
                            <div className="flex flex-col w-full h-40 text-lg font-bold gap-4 items-center justify-center
                                border-2 border-dashed rounded-3xl cursor-pointer border-red-500 text-red-400 mb-5 lg:mb-0 lg:h-60 xl:h-72">
                                <div className="flex w-16 h-16 bg-red-100 justify-center rounded-full  transition-all ease-in-out delay-150 hover:text-white hover:bg-red-500">
                                    < ArrowUpTrayIcon className="w-9" onClick={onChooseFile} />
                                </div>
                                <button>
                                    <span>Upload File</span>
                                </button>
                            </div>
                            {selectedFile && <div className="flex w-full h-12 items-center justify-between bg-red-100 rounded-3xl">
                                <p className="ml-4 text-sm font-medium">{selectedFile.name}</p>
                                <div className="flex w-12 h-12 justify-center items-center rounded-3xl text-red-700 transition-all ease-in-out delay-150 hover:bg-red-500 hover:text-white">
                                    <button className="w-8 h-8 cursor-pointer" onClick={removeFile}>
                                        < TrashIcon />
                                    </button>
                                </div>

                            </div>}
                        </div>

                        {/* Information Field */}
                        <div className="">

                            {/* Item Field */}
                            <Legend className="text-lg font-semibold text-black">Item details</Legend>
                            <Field>
                                <Label className="text-sm/6 font-medium text-black">Item Name:</Label>
                                <Input
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
                                                className={`px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300 ${selectedTags.includes(color) ? 'border-[1px] border-red-500 bg-transparent hover:bg-transparent' : 'border-none'}`}
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
                                            {["Pastel", "Vintage", "Retro", "Neon", "Gold", "Light", "Dark", "Warm", "Cold", "Summer", "Fall", "Winter", "Spring", "Happy", "Nature", "Earth", "Night", "Space", "Rainbow", "Gradient", "Sunset", "Sky", "Sea", "Kids", "Skin", "Food", "Cream", "Coffee", "Wedding", "Christmas", "Halloween"].map(collectionType => (
                                                <button
                                                    key={collectionType}
                                                    type="button"
                                                    className={`px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300 ${selectedTags.includes(collectionType) ? 'border-[1px] border-red-500 bg-transparent hover:bg-transparent' : 'border-none'}`}
                                                    onClick={() => handleTagSelection(collectionType)}
                                                >
                                                    {collectionType}
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
                                                    className={`px-3 py-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300 ${selectedTags.includes(item) ? 'border-[1px] border-red-500 bg-transparent hover:bg-transparent' : 'border-none'}`}
                                                    onClick={() => handleTagSelection(item)}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Field>
                        </div>
                    </div>
                </Fieldset>

                {/* Post Button */}
                <Button type="submit" onClick={() => router.push('/home')} className="inline-flex absolute top-[85px] right-10 items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-red-600">
                    POST
                </Button>
            </form>
        </div>
    );
};

