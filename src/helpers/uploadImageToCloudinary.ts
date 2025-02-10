// const uploadImageToCloudinary = async (imageUri: string) => {
//     const data = new FormData();
//     data.append("file", {
//       uri: imageUri,
//       type: "image/jpeg",
//       name: "upload.jpg",
//     });
//     data.append("upload_preset", "herbs_upload"); // ✅ ใช้ Upload Preset ของ Cloudinary
//     data.append("cloud_name", "dyct5fy0j"); // ✅ ใส่ Cloud Name ของคุณ

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dyct5fy0j/image/upload",
//         {
//           method: "POST",
//           body: data,
//           headers: {
//             "Content-Type": "multipart/form-data", // ✅ ป้องกัน Error บน Android 9+
//           },
//         }
//       );
//       const result = await response.json();

//       if (result.secure_url) {
//         return result.secure_url; // ✅ ได้ URL ของรูปจาก Cloudinary
//       } else {
//         console.error("Upload failed:", result);
//         return null;
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       return null;
//     }
//   };

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
