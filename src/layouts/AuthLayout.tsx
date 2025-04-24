import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";

function AuthLayout() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex justify-center items-center">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}

export default AuthLayout;
