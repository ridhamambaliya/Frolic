import { Route, Routes } from "react-router-dom"
import Login from "../features/auth/pages/login"
import Register from "../features/auth/pages/register"
import AdminDashboard from "../features/admin/pages/adminDashboard";
import AdminSettings from "../features/admin/pages/adminSettings";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import AdminDepartments from "../features/admin/pages/adminDepartment";
import AdminInstitutes from "../features/admin/pages/adminInstitutes";
import AdminEvents from "../features/admin/pages/adminEvents";
import AdminUsers from "../features/admin/pages/adminUsers";
import InstituteDashboard from "../features/Institute/pages/instituteDashboard";
import InstituteDepartment from "../features/Institute/pages/instituteDepartment";
import InstituteEvent from "../features/Institute/pages/instituteEvents";
import InstituteSettings from "../features/Institute/pages/instituteSettings";
import StudentDashboard from "../features/student/pages/studentdashboard";

// define all routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      <Route path="/admin/institutes"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminInstitutes />
          </ProtectedRoute>
        } />
      <Route path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDepartments />
          </ProtectedRoute>
        } />
      <Route path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminEvents />
          </ProtectedRoute>
        } />
      <Route path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        } />
      <Route path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminSettings />
          </ProtectedRoute>
        } />
      <Route path="/institute/dashboard"
        element={
          <ProtectedRoute allowedRoles={["institute_coordinator"]}>
            <InstituteDashboard />
          </ProtectedRoute>
        } />
      <Route path="/institute/departments"
        element={
          <ProtectedRoute allowedRoles={["institute_coordinator"]}>
            <InstituteDepartment />
          </ProtectedRoute>
        } />
      <Route path="/institute/events"
        element={
          <ProtectedRoute allowedRoles={["institute_coordinator"]}>
            <InstituteEvent />
          </ProtectedRoute>
        } />
      <Route path="/institute/settings"
        element={
          <ProtectedRoute allowedRoles={["institute_coordinator"]}>
            <InstituteSettings />
          </ProtectedRoute>
        } />
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRoles={["student", "department_coordinator", "event_coordinator"]}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/student/events" element={
        <ProtectedRoute allowedRoles={["student", "department_coordinator", "event_coordinator"]}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes
