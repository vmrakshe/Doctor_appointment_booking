import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import userImage from "../../assets/images/profile_image.png";
import UserBookings from "./UserBookings";
import ProfileSettings from "./ProfileSettings";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";

const UserAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  //console.log(userData);

  const handleLogout = () => {
    toast.success("Logout successful");
    dispatch({ type: "LOGOUT" });
  };

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this account?"
      );
      if (!confirmDelete) return;

      const response = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      toast.success(message);
      dispatch({ type: "DELETE_ACCOUNT" });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="py-[40px]">
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* Data is loading... */}
        {loading && !error && <Loading />}

        {/* Error Handling */}
        {error && !loading && <Error errorMessage={error.message} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-15">
            {/* ---- User Profile Section ---*/}
            <div className="pb-[40px] px-[35px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor bg-blue-300">
                  <img
                    src={userData.photo ? userData.photo : userImage}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </figure>
              </div>

              <div className="text-center mt-3 ">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold ">
                  {userData.name}
                </h3>
                <p className="text-[14px] leading-[24px] text-textColor font-normal">
                  {userData.role}
                </p>
                <p className="text-[14px] leading-[24px] text-textColor font-normal">
                  {userData.email}
                </p>
                <p className="text-[14px] leading-[24px] text-textColor font-normal">
                  Blood Group🩸: {userData.bloodType}
                </p>
              </div>

              <div className="mt-[20px] md:mt-[100px] lg:mt-5">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] P-3 text-[14px] leading-9 rounded-md text-white "
                >
                  Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full bg-red-600 mt-2 P-3 text-[14px] leading-9 rounded-md text-white"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* bookings and settings */}

            <div className="md:col-span-2 md:px-[30px] ">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 rounded-md text-headingColor font-semibold text-[16px] leading-5 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("profile_settings")}
                  className={`${
                    tab === "profile_settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 rounded-md text-headingColor font-semibold text-[16px] leading-5 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" ? (
                <UserBookings />
              ) : tab === "profile_settings" ? (
                <ProfileSettings user={userData} />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAccount;
