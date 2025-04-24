import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import { ConfirmDialogProvider } from "../components/confirm-dialog/ConfirmDialog";

function MainLayout() {
  return (
    <ConfirmDialogProvider>
      <ProtectedRoute>
        <Header />

        <main className="p-4 w-full md:max-w-5xl mx-auto">
          <Outlet />
        </main>
      </ProtectedRoute>
    </ConfirmDialogProvider>
  );
}

export default MainLayout;
