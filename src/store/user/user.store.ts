import { create } from "zustand";
import { UserAction, UserState } from "./types";
import { showAlertError } from "../../helpers/util";
import { httpClient } from "../../plugins/axios";
import useAuthStore from "../auth/auth.store";
import { toast } from "sonner";

const initialState: UserState = {
  loading: false,
};

const setUserLogged = useAuthStore.getState().setUserLogged;

const useUserStore = create<UserState & UserAction>((set) => ({
  ...initialState,
  updateUser: async (userId, user) => {
    try {
      set({ loading: true });
      const { data } = await httpClient.patch(`/user/${userId}`, user);
      setUserLogged(data.user);
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      showAlertError(error as any);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
