import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Kishore Kumar",
    image: assets.profile_pic,
    email: "kishoresrd123@gmail.com",
    phone: "938465799",
    address: {
      line1: "67th cross street",
      line2: "circle, road, London"
    },
    gender: "male",
    dob: "28.05.2005"
  });

  const [isEdit, setEdit] = useState(true);

  return (
    <div className="p-6 max-w-lg mx-auto text-gray-800">
      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
        />
        <h2 className="text-2xl font-semibold">{userData.name}</h2>
      </div>

      <hr className="my-4" />

      {/* Contact Information */}
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
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border p-1 rounded w-full"
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
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
                className="border p-1 rounded w-full mb-2"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
                className="border p-1 rounded w-full"
              />
            </>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Basic Information */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Basic Information</h3>

        <div>
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border p-1 rounded w-full"
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
              type="text"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="border p-1 rounded w-full"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setEdit(!isEdit)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {isEdit ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
