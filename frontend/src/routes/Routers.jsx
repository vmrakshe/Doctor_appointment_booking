import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import UserAccount from "../Dashboard/user-account/UserAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/Doctors/CheckoutSuccess";

import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              {/* <UserAccount /> is children to the  protectedroute as parameter */}
              <UserAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
