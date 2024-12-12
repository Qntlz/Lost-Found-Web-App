import { cloudinary } from "@/cloudinaryConfig"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const file = body.file; // Base64-encoded image data

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "lost_found", // Replace with your Cloudinary upload preset
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
