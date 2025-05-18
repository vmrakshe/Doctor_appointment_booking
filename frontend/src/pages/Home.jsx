import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";

import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";

import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import faqImg from "../assets/images/faq-img.png";

import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
import { token } from "../config";

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleRegister = () => {
    const role = localStorage.getItem("role"); //get role from localstorage
    if (!token) {
      return;
    }
    role === "doctor" ? navigate("/doctors") : navigate("/users/profile/me");
  };
  return (
    <>
      {/*====== hero section ======*/}

      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* hero content */}

            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  "Your health,your schedule. Book trusted doctors now."
                </h1>
                <p className="text__para">
                  Get expert medical care when you need it. Browse top-rated
                  doctors, view availability, and schedule appointments — all in
                  just a few clicks.From general physicians to specialists, find
                  the right healthcare professional for you and your family. No
                  long queues, no endless phone calls — just fast, easy, and
                  reliable healthcare at your fingertips.
                </p>
                {(role === "doctor" || role === "patient") && (
                  <button onClick={handleRegister} className="btn">
                    Request an Appointment
                  </button>
                )}
              </div>

              {/* hero counter */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-[40px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] text-headingColor lg:text-[44px] lg:leading-[54px] font-[700]">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-11px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] text-headingColor lg:text-[44px] lg:leading-[54px] font-[700]">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-11px]"></span>
                  <p className="text__para">Clinic Location</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] text-headingColor lg:text-[44px] lg:leading-[54px] font-[700]">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-11px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* hero image */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="doctorImage1" />
              </div>
              <div className="mt-[35px]">
                <img
                  className="w-full mb-[30px]"
                  src={heroImg02}
                  alt="doctorImage2"
                />
                <img className="w-full" src={heroImg03} alt="doctorImage3" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end of hero section */}

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing The Best Medical Services
            </h2>
            <p className="text__para text-center">
              World-Class Care For Everyone. Our health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] 
          mt-[30px] lg:mt-[55px]"
          >
            {/* find a doctor section */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find A Doctor
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Find an any doctor in just a click !!
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* find a location section */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find A Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  find the nearest location of our health care system.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* book a appointment section */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Book appointment in one click for health issues
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about section --> */}
      <About />

      {/* services section --> */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Services</h2>
            <p className="text__para text-center">
              World-Class Care For Everyone. Our health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* features section -->*/}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* feature content */}

            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get Virtual Treatment <br /> Anytime.
              </h2>

              <ul className="pl-4">
                <li className="text__para">
                  1. Schedule The Appointment Directly.
                </li>
                <li className="text__para">
                  2. Search for Your Physician Here and Contact Their Office.
                </li>
                <li className="text__para">
                  3. View Our Physicians Who Are Accepting New Patients, Use the
                  Online Scheduling Tool to Select an Appointment Time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>

            {/* feature image */}

            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="" />

              {/* Modified Appointment Card - Smaller and at bottom */}
              <div className="w-[130px] lg:w-[200px] bg-white absolute bottom-7 left-0 z-20 p-2 rounded-[8px] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[10px] leading-[5px] text-headingColor font-[600]">
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] text-textColor font-[400]">
                      10:00 AM
                    </p>
                  </div>
                  <span className="w-5 h-5 flex items-center justify-center bg-yellowColor rounded py-1 px-[6px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] bg-[#CCF0F3] py-1 px-2 text-[8px] leading-[8px] text-irisBlueColor font-[500] mt-2 rounded-full">
                  Consultation
                </div>

                <div className="flex items-center gap-[6px] mt-2">
                  <img src={avatarIcon} alt="" className="w-6 h-6" />
                  <h4 className="text-[10px] leading-3 font-[700] text-headingColor">
                    Doctor Steven Strange
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*doctores section  */}

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Great Doctors</h2>
            <p className="text__para text-center">
              World-Class Care For Everyone. Our Health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>

          <DoctorList />
        </div>
      </section>

      {/* FAQ  section-->  */}

      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most Frequent Questions Asked By Our Beloved Patient
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* testimonial section -->*/}

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What Our Patients Say</h2>
            <p className="text__para text-center">
              World-Class Care For Everyone. Our Health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>

      {/* end of testimonial section */}
    </>
  );
};

export default Home;
