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