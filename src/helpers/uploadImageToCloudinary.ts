export const uploadImageToCloudinary = async (imageUri: string) => {
  try {
    let formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "upload.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("upload_preset", "herbs_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyct5fy0j/image/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const result = await response.json();
    console.log("Cloudinary Upload Response:", result);

    if (result.secure_url) {
      return result.secure_url;
    } else {
      console.error("Upload failed:", result);
      return null;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
