import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const DoctorProfile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    //e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    //console.log(data.url)
    setFormData({ ...formData, photo: data?.secure_url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //reusable function for adding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleAddQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  //reusable input change function.
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  //reusable function for delete item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleDeleteQualification = (event, index) => {
    event.preventDefault();
    deleteItem("qualifications", index);
  };

  //hadler for experience

  const handleAddExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const handleDeleteExperience = (event, index) => {
    event.preventDefault();
    deleteItem("experiences", index);
  };

  //hadler for timeslots

  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const handleDeleteTimeSlot = (event, index) => {
    event.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label ">Name*</p>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label ">Email*</p>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            aria-readonly
            readOnly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form__label ">Phone No.*</p>
          <input
            type="number"
            value={formData.phone || ""}
            name="phone"
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label ">Bio*</p>
          <input
            type="text"
            value={formData.bio ||""}
            name="bio"
            onChange={handleInputChange}
            placeholder="Biography"
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Genders*</p>
              <select
                name="gender"
                onChange={handleInputChange}
                value={formData.gender}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                onChange={handleInputChange}
                value={formData.specialization}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            {doctorData.role === "doctor" && (
              <div>
                <p className="form__label">Ticket Price*</p>
                <input
                  type="number"
                  placeholder="100"
                  name="ticketPrice"
                  value={formData.ticketPrice||""}
                  className="form__input"
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* qualification section -> */}
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input mt-2"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input mt-2"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                {/*degree and university  */}
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="from__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input mt-2"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input mt-2"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteQualification(e, index)}
                  className="bg-red-500 rounded-full text-white p-1.5 mt-2 mb-[30px]"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddQualification}
            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>

        {/* Experiences*/}
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="from__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input mt-2"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input mt-2"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                {/*degree and university  */}
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="from__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input mt-2"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="from__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form__input mt-2"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteExperience(e, index)}
                  className="bg-red-500 rounded-full text-white p-1.5 mt-2 mb-[30px]"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddExperience}
            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>

        {/* time slots*/}
        {doctorData.role == "doctor" && (
          <div className="mb-5">
            <p className="form__label">Time Slots*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="from__label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form__input py-3.5 mt-2"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      >
                        <option value="">Select</option>
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                      </select>
                    </div>
                    <div>
                      <p className="from__label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input mt-2"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="from__label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input mt-2"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div className="flex items-center ">
                      <button
                        onClick={(e) => handleDeleteTimeSlot(e, index)}
                        className="bg-red-500 rounded-full text-white p-1.5 mt-8"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddTimeSlot}
              className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Timeslot
            </button>
          </div>
        )}

        {/* about section */}
        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        {/* upload photo section */}
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                    text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-3">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor py-2 px-5 text-semibold text-white h-fit w-full cursor-pointer rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
