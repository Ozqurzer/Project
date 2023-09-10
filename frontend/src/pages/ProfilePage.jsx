import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

export function ProfilePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  console.log({ user });

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setNewProfileImage(selectedImage);
  };

  const handleImageUpload = async () => {
    if (!newProfileImage) return;

    const formData = new FormData();
    formData.append("profileImage", newProfileImage);

    setUploading(true);
    setUploadError(null);

    try {
      const response = await axios.post("/api/upload-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user profile image in your context or state
      console.log("Image uploaded:", response.data);
    } catch (error) {
      setUploadError("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>loading......</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center p-10 bg-gray-100 rounded-md">
        <img
          src="/img/user.jpeg" // Use user.profileImage if available
          alt="User's profile"
          className="w-40 h-40 rounded-full"
        />
        <div className="text-gray-900 ml-4">
          <p className="text-sm font-semibold">My profile TUTOR</p>
          <p className="text-4xl font-semibold mb-2">
            {isAuthenticated ? user.name : ""}
          </p>
          <p className="text-xs">
            DCI {isAuthenticated ? user.role : ""}, - Kein Standort
          </p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            onClick={handleImageUpload}
            disabled={!newProfileImage || uploading}
          >
            {uploading ? "Uploading..." : "Upload Profile Image"}
          </button>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}
