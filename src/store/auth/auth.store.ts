import { create } from "zustand";
import { AuthActions, AuthState, RegisterResponse } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../../plugins/axios";
import { User } from "../user/types";
import { showAlertError } from "../../helpers/util";
import { toast } from "sonner";

const initialState: AuthState = {
  userLogged: null,
  loading: false,
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      async register(payload) {
        try {
          set({ loading: true });
          const { data } = await httpClient.post<RegisterResponse>(
            "/auth/register",
            payload
          );
          set({ userLogged: data.user });
        } catch (error) {
          set({ userLogged: null });
          showAlertError(error as any);
        } finally {
          set({ loading: false });
        }
      },

      async login(payload) {
        try {
          set({ loading: true });
          const response = await httpClient.post<User>("/auth/login", payload);
          set({ userLogged: response.data });
        } catch (error) {
          set({ userLogged: null });
          showAlertError(error as any);
        } finally {
          set({ loading: false });
        }
      },

      logout() {
        set({ userLogged: null });
      },

      setUserLogged(user) {
        set({ userLogged: user });
      },

      async changePassword(userId, payload) {
        try {
          set({ loading: true });
          await httpClient.put(`/auth/update-password/${userId}`, payload);
          toast.success("Contraseña cambiada correctamente");
          return true;
        } catch (error) {
          showAlertError(error as any);
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
