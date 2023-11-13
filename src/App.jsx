import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import UserProfileEdit from "./components/UserProfileEdit";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import PublicAdminRoute from "./components/Admin/PublicAdminRoute";
import ProtectAdminRoute from "./components/Admin/ProtectAdminRoute";
import UsersList from "./components/Admin/UsersList";
import AdminUserEdit from "./components/Admin/AdminUserEdit";
import AddUser from "./components/Admin/AddUser";
import Bills from "./components/userBills";
import AdminAddBills from "./components/Admin/AdminAddNewBills";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* User Side */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              {" "}
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill-details"
          element={
            <ProtectedRoute>
              {" "}
              <Bills/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile-edit"
          element={
            <ProtectedRoute>
              {" "}
              <UserProfileEdit />
            </ProtectedRoute>
          }
        />
        {/* Admin side */}
        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              {" "}
              <AdminLogin />{" "}
            </PublicAdminRoute>
          }
        />
        <Route
          path="/adminHome"
          element={
            <ProtectAdminRoute>
              {" "}
              <AdminHome />{" "}
            </ProtectAdminRoute>
          }
        />
        <Route path="/users-list" element={
          <ProtectAdminRoute>
            <UsersList />
          </ProtectAdminRoute>
        }/>
        <Route path="/admin-user-edit" element={
          <ProtectAdminRoute>
            <AdminUserEdit  />
          </ProtectAdminRoute>
        } />
        <Route path="/admin-add-user" element={
          <ProtectAdminRoute>
            <AddUser/>
          </ProtectAdminRoute>
        } />
        <Route path="/admin-new-bill" element={
          <ProtectAdminRoute>
            <AdminAddBills/>
          </ProtectAdminRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
