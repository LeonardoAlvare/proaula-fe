import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import { ConfirmDialogProvider } from "../components/confirm-dialog/ConfirmDialog";
import LandingHeader from "../components/landing-header/LandingHeader";

function MainLayout() {
  return (
    <ConfirmDialogProvider>
      <ProtectedRoute>
        <LandingHeader />

        <main className="p-4 w-full md:max-w-5xl mx-auto">
          <Outlet />
        </main>
      </ProtectedRoute>
    </ConfirmDialogProvider>
  );
}

export default MainLayout;
