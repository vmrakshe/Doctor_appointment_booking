import logo from "../../assets/images/logo.png";
import doctorImage from "../../assets/images/doctor.png";
import patientImage from "../../assets/images/patient.png";
//import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services ",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Header = () => {

  //Accessing DOM elements directly
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        //When the user scrolls more than 80px, the header becomes sticky 
        // (e.g., stays fixed at the top).
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);//when component unmount
  });

  //If the element does not have the class show__menu, it adds it.
  // If the element already has the class, it removes it.
  const toggleMenu = () => {
    menuRef.current.classList.toggle("show__menu");
  };

  return (
    <>
      <header className="header flex items-center" ref={headerRef}>
        <div className="container ">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            {/* Navigation Section */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/*login ,userimage,menu button */}
            <div className="flex items-center gap-4 ">
              {token && user ? (
                <div className="flex flex-col items-center">
                  <Link
                    to={`${
                      role === "doctor" || role === "admin"
                        ? "/doctors/profile/me"
                        : "/users/profile/me"
                    }`}
                    className="flex flex-col items-center gap-1 no-underline"
                  >
                    <figure className="w-10 h-10 rounded-full cursor-pointer">
                      <img
                        src={
                          role === "doctor" || role === "admin"
                            ? user.photo
                              ? user.photo
                              : doctorImage
                            : patientImage
                        }
                        className="w-full h-full rounded-full object-cover"
                        alt="User profile"
                      />
                    </figure>
                    <h2 className="text-sm font-medium text-gray-800 ">
                      {role === "admin" ? "Admin" : user?.name}
                    </h2>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-primaryColor py-1 px-5 text-white font-[600] h-[40px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )}

              <span className="md:hidden" onClick={toggleMenu}>
                {/* responsive utility class that hides an element starting 
                from medium screen sizes (768px and up). 
                hides the menu icon when screen is medium and above medium
                below medium screen icon visible*/}
                <BiMenu className="text-[30px] text-textColor cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
