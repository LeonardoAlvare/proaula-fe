import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "sweetalert2/src/sweetalert2.scss";

import Tailwind from "primereact/passthrough/tailwind";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider value={{ pt: Tailwind }}>
    <Toaster richColors />
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </PrimeReactProvider>
);
