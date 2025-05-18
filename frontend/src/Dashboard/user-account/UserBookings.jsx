import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
//import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import BookedDetails from "./BookedDetails";

const UserBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div className=" bg-gray-100 py-[40px] h-screen mt-1">
      <div className="flex justify-center items-center ">
        {loading && !error && <Loading />}
      </div>

      {/* Error Handling */}
      {error && !loading && <Error errorMessage={error.message} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 ">
          {appointments.map((doctor) => (
            <BookedDetails key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center  leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any appointment yet!!
        </h2>
      )}
    </div>
  );
};

export default UserBookings;
