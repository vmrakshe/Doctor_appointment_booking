//vite based projects variables must be prefixed with VITE_ to be exposed
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadImageToCloudinary = async (file) => {

  //FormData() is a built-in JavaScript object that allows 
  // you to construct and send key-value pairs of data (like form inputs) to a server.

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", uploadPreset);
  uploadData.append("cloud_name", cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    //return data.secure_url; // Return the URL of the uploaded image
    return data;
    
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageToCloudinary;
