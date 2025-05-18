import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const BookedDetails = ({ doctor }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden flex items-center p-2 space-x-4 hover:shadow-lg transition  grid-flow-col">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={doctor.photo}
        alt={doctor.name}
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
        <p className="text-gray-600 text-sm">{doctor.specialization}</p>
        <p className="text-gray-500 text-sm">
          {doctor.experiences[0]?.hospital}
        </p>
      </div>
      <Link
        to={`/doctors/${doctor._id}`}
        className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]
               flex items-center group hover:bg-primaryColor hover:border-none justify-center"
      >
        <BsArrowRight className="group-hover:text-white w-6 h-5" />
      </Link>
    </div>
  );
};

export default BookedDetails;
