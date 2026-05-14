import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const getUserData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/get",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setName(response.data.userData.name);
        setCurrentImage(response.data.userData.image);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserData();
  }, [token]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const updatedName = name || user.name;
      formData.append("name", name);
      if (image) formData.append("image", image);
      const response = await axios.post(
        backendUrl + "/api/user/update",
        formData,
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success("Profile updated");
        getUserData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center gap-4 w-full sm:max-w-96"
        >
          {(image || currentImage) && (
            <img
              src={image ? URL.createObjectURL(image) : currentImage}
              className="w-24 h-24 rounded-full object-cover border"
              alt="profile"
            />
          )}
          <div className="w-full">
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Name"
              required
            />
          </div>
          <div className="w-full">
            <p className="text-sm text-gray-500 mb-1">Profile Photo</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-2 mt-4 text-sm text-white tracking-wide bg-gradient-to-r from-emerald-800 to-teal-900/70 hover:opacity-90 active:scale-95 transition-all duration-300 rounded-md shadow-sm"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
