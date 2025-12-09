import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  console.log("USER DATA (Context):", userData);

  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState(false);

  // 🔥 Show loading until Data arrives
  if (!userData) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  // -------------------
  // UPDATE PROFILE
  // -------------------
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile Updated Successfully");
        await loadUserProfileData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // -------------------
  // UI RETURN
  // -------------------
  return (
    <div className="p-6 max-w-lg mx-auto text-gray-800">
      <div className="flex flex-col items-center gap-4 mb-6">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={assets.upload_icon}
                  alt=""
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-2xl font-semibold">{userData.name}</p>
        )}
      </div>

      {/* CONTACT INFO */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Contact Information</h3>

        <div>
          <p className="font-medium">Email:</p>
          <p>{userData.email}</p>
        </div>

        <div>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="border p-1 rounded w-full"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <>
              <input
                className="border p-1 rounded w-full mb-2"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="border p-1 rounded w-full"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </>
          ) : (
            <>
              <p>{userData.address.line1}</p>
              <p>{userData.address.line2}</p>
            </>
          )}
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div className="space-y-3 mt-4">
        <h3 className="font-semibold text-lg">Basic Information</h3>

        <div>
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="border p-1 rounded w-full"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>

        <div>
          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="border p-1 rounded w-full"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
