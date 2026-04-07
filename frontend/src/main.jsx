// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './styles/index.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './pages/login'
// import Register from './pages/register'
// import { DashBoard } from './pages/DashBoard'
// import AdminDashboard from './pages/admin/admindashboard'
// import AdminDepartments from './pages/admin/adminDepartment'
// import AdminEvents from './pages/admin/adminEvent'
// import AdminUsers from './pages/admin/adminUsers'
// import AdminSettings from './pages/admin/aminSettings'
// import InstituteDashBoard from './pages/institute/instituteDashboard'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/register' element={<Register/>} />
//         <Route path='/admin/dashboard' element={<AdminDashboard />} />
//         <Route path='/admin/departments' element={<AdminDepartments />} />
//         <Route path='/admin/events' element={<AdminEvents />} />
//         <Route path='/admin/users' element={<AdminUsers />} />
//         <Route path='/admin/settings' element={<AdminSettings />} />
//         <Route path='/institute/dashboard' element={<InstituteDashBoard />} />
//         <Route path='/institute/departments' element={<AdminSettings />} />
//         <Route path='/institute/Branch' element={<AdminSettings />} />
//         <Route path='/institute/settings' element={<AdminSettings />} />


//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./app/app";
import AdminDashboard from "./features/admin/pages/adminDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  // It’s a development-only checker tool helps to find bugs, bad practices, and unsafe code early
  <React.StrictMode>
    <App />
  </React.StrictMode>
);