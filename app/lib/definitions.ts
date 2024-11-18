export type Post = {
    id: string;
    itemName: string;
    campus: string;
    building: string;
    description: string;
    status: string,
    tags: string[];
    imageUrl: string | null;
    submittedAt: any; // Use Timestamp or Date type if needed
};