## 🖼 Screenshots

![Screenshot 2025-05-18 193200](https://github.com/user-attachments/assets/d3a2bd15-74f3-4621-aa66-6937c7df48cd)
![Screenshot 2025-05-18 192721](https://github.com/user-attachments/assets/7028c977-4d37-45c5-bd00-af286a9833b0)
![Screenshot 2025-05-18 192345](https://github.com/user-attachments/assets/9e4cc212-3bf9-4fc5-aa59-9e41252f1622)
![Screenshot 2025-05-18 192210](https://github.com/user-attachments/assets/24b0a9aa-1a1c-40cb-a9d1-49efd5328533)

## 🏥 Doctor Appointment Booking App

A full-stack **Doctor Appointment Booking** application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. The platform allows users to register, search for doctors, book appointments, and manage their schedules.

## 🚀 Features

- **User Authentication(using JWT = JSON WEB TOKEN)** (Register/Login)
- **Role-based Access** (User, Doctor, Admin)
- **Appointment Booking & Scheduling**
- **Doctor Profile Management**
- **Admin Dashboard** for managing doctors and approving
- **Responsive UI** using React and Bootstrap/Tailwind
- **RESTful API** integration

**Frontend:**
- React.js(vite)
- context api
- React Router DOM
- Tailwind CSS,postcss

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- dotenv


## 🔧 Installation

### Prerequisites
- Node.js
- MongoDB
- Git
- stripe payment account for payment (only of testing purpose)
- cloudinary cloud account to store and retrieve the profile image

### Clone the repository

```bash
git clone https://github.com/your-username/doctor-appointment-app.git
cd doctor-appointment-app
```
### create react app(vite)

```bash
npm create vite@latest <your_folder_name>
npm install -D tailwind postcss
npx tailwind css init -p
```
### Install frontend dependencies

```
cd ./frontend
npm install
```
### Install backend dependencies

```
cd ./backend
npm install
```
> 📌 **Note:** Make sure to  fill all environment variable in `.env file` in both `frontend` and `backend` folders before starting the app.

ℹ️ **Tip:** The `_redirects` file is required when deploying Single Page Applications (SPAs) like those built with React Router, Vue Router, or Angular,  especially on static hosting platforms like Netlify, Vercel, or GitHub Pages.It ensures client-side routing works after page refresh or direct URL access.If hosting platform don't find a file that matches the request, serve the `mention file from _redirects`instead (where React app lives).

### Run the application
```
# In one terminal, run backend
cd backend
npm run start/start_dev

# In another terminal, run frontend
cd frontend
npm run dev
```

## 📦 Deployment
- Frontend: Vercel / Netlify
- Backend: Render /
- MongoDB: MongoDB Atlas

## 🙌 Acknowledgements
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind](https://tailwindcss.com/)


