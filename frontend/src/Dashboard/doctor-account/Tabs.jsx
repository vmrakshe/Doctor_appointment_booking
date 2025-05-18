import React from "react";
import { BiMenu } from "react-icons/bi";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import { useState } from "react";

const Tabs = ({ tab, setTab, doctorData }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleDeleteAccount = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this account?"
      );
      if (!confirmDelete) return;

      const response = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
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

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    toast.success("Logout successful");
  };
  return (
    <div>
      <span className="block lg:hidden" onClick={toggleMenu}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>

      {/* Menu (conditionally visible based on isOpen or on large screens) */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md lg:flex`}
        onClick={toggleMenu}
      >
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-200 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        {doctorData.role === "doctor" && (
          <button
            onClick={() => setTab("appointments")}
            className={`${
              tab === "appointments"
                ? "bg-indigo-200 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Appointments
          </button>
        )}

        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-200 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile Settings
        </button>

        {doctorData.role === "admin" && (
          <button
            onClick={() => setTab("alldoctors")}
            className={`${
              tab === "alldoctors"
                ? "bg-indigo-200 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            All Doctors Profile
          </button>
        )}

        <div className="mt-[80px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] P-3 text-[14px] leading-10 rounded-md text-white "
          >
            Logout
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 mt-3 P-3 text-[14px] leading-9 rounded-md text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
