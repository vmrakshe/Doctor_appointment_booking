import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useState } from "react";
import { toast } from "react-toastify";

const AllDoctorsProfile = () => {
  const {
    data: doctorsData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/allprofile/admin`);

  const [doctors, setDoctors] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [updatingDoctorId, setUpdatingDoctorId] = useState(null); // Track which doctor is being updated

  // Load doctors from fetched data once
  if (!loading && !isInitialized && doctorsData?.length) {
    setDoctors(doctorsData);
    setIsInitialized(true);
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingDoctorId(id); // Set loading for particular doctor

      const response = await fetch(`${BASE_URL}/doctors/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw Error(result.message);
      }

      // Update local state
      setDoctors((prevDoctors) =>
        prevDoctors.map((doc) =>
          doc._id === id ? { ...doc, isApproved: newStatus } : doc
        )
      );

      toast.success(result.message);
    } catch (err) {
      //console.log(err.message)
      toast.error(err.message);
    } finally {
      setUpdatingDoctorId(null); // Reset loading
    }
  };
  return (
    <div className="bg-gray-100 py-[20px] min-h-screen ">
      <div className="flex justify-center items-center">
        {loading && !error && <Loading />}
      </div>

      {error && !loading && <Error errorMessage={error.message} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {doctors.map(
            (doctor) =>
              doctor.role === "doctor" && (
                <div
                  key={doctor._id}
                  className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center"
                >
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {doctor.specialization}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {doctor.qualifications[0].degree}
                  </p>
                  <p className="text-gray-500 text-sm ">
                    Experience at {doctor.experiences[0].hospital}
                  </p>
                  <p
                    className={`text-sm font-medium mb-2 
                ${
                  doctor.isApproved === "pending"
                    ? "text-yellow-500"
                    : doctor.isApproved === "approved"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
                  >
                    {doctor.isApproved}
                  </p>

                  {/* Status Dropdown */}
                  <div className="w-full mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status:
                    </label>
                    <select
                      value={doctor.isApproved}
                      onChange={(e) =>
                        handleStatusChange(doctor._id, e.target.value)
                      }
                      disabled={updatingDoctorId === doctor._id} // Disable during update
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Small loading indicator */}
                    {updatingDoctorId === doctor._id && (
                      <p className="text-xs text-blue-500 mt-1">Updating...</p>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default AllDoctorsProfile;
