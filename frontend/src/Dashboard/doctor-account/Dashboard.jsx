import { useState } from "react";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import doctorImage from "../../assets/images/doctor-profile.jpg";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import DoctorProfile from "./DoctorProfile";
import Appointments from "./Appointments";
import AllDoctorsProfile from "./AllDoctorsProfile";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto ">
        {loading && !error && <Loading />}
        {!loading && error && <Error erroMessage={error.message} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} doctorData={data} />
            <div className="lg:col-span-2">
              {(data.isApproved === "pending" ||
                data.isApproved === "cancelled") && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-100/60 rounded-lg">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="currentColor"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 9.5C12.8284 9.5 13.5 8.82843 13.5 8C13.5 7.17157 12.8284 6.5 12 6.5C11.1716 6.5 10.5 7.17157 10.5 8C10.5 8.82843 11.1716 9.5 12 9.5ZM14 15H13V10.5H10V12.5H11V15H10V17H14V15Z"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    Your account is currently under review. You will be notified
                    once it is approved.
                  </div>
                </div>
              )}

              <div className="mt-1">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] rounded-full ">
                        <img
                          src={data?.photo ? data.photo : doctorImage}
                          alt="profile photo"
                          className="w-full"
                        />
                      </figure>

                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization}
                        </span>
                        <h3 className="text-[20px] leading-9 font-semibold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold ">
                            <img src={starIcon} alt="" />
                            {data.averageRating}
                          </span>
                          <span className=" text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold ">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments appointments={data.appointments} />
                )}
                {tab === "settings" && <DoctorProfile doctorData={data} />}
                {tab === "alldoctors" && (
                  <AllDoctorsProfile doctorData={data} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
