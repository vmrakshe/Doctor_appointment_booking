import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";// It enables declarative routing in React applications by mapping specific routes to components.
import { ToastContainer } from "react-toastify";//toast notification message
import "react-toastify/dist/ReactToastify.css";

//that manages and shares authentication state (like user data, login status, and tokens) 
// across your entire application using React's Context API
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer
          theme="dark"
          position="bottom-center"
          autoClose={2000}
          closeOnClick
          pauseOnHover={false}
        />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
