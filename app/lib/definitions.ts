export type user = {
    id: string;
    name: string;
};

export type userListProps = {
    items: Post[];
    userList: user[];
    showFilters: boolean;
    selectedStatus: string;
    selectedCampus: string;
    selectedBuilding: string;
    setItems: React.Dispatch<React.SetStateAction<Post[]>>;
    setUserList: React.Dispatch<React.SetStateAction<user[]>>;
};


export type Post = {
    id: string;
    user: string;
    tags: string[];
    campus: string;
    status: string;
    submittedAt: any;
    itemName: string;
    building: string;
    description: string;
    imageUrl: string | null;
};

export type Feed = {
    showFilters: boolean;
    selectedStatus: string;
    selectedCampus: string;
    selectedBuilding: string;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCampus: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBuilding: React.Dispatch<React.SetStateAction<string>>;
}

export type ArchivePost = {
    id: string;
    itemName: string;
    description: string;
    status: "Found" | "Missing";
    campus: string;
    building: string;
    tags: string[];
    user: string;
    submittedAt: Date;
}