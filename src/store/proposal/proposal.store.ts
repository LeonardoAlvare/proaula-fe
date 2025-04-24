import { create } from "zustand";
import { ProposalAction, ProposalState } from "./types";
import { httpClient } from "../../plugins/axios";
import { toast } from "sonner";
import { showAlertError } from "../../helpers/util";
import useAuthStore from "../auth/auth.store";

const initialState: ProposalState = {
  proposals: [],
  loading: false,
};

const user = useAuthStore.getState().userLogged;

const useProposalStore = create<ProposalState & ProposalAction>((set) => ({
  ...initialState,

  createProposal: async (proposal) => {
    try {
      await httpClient.post("/proposal", proposal);
      toast.success("Postulación creada exitosamente");
    } catch (error) {
      showAlertError(error as any);
    }
  },

  getProposalsByUserId: async () => {
    try {
      set({ loading: true, proposals: [] });
      const { data } = await httpClient.get(`/proposal/user/${user?._id}`);
      set({ proposals: data });
    } catch (error) {
      showAlertError(error as any);
    } finally {
      set({ loading: false });
    }
  },

  getProposalsByProjectId: async (projectId) => {
    try {
      set({ loading: true, proposals: [] });
      const { data } = await httpClient.get(`/proposal/project/${projectId}`);
      set({ proposals: data });
    } catch (error) {
      showAlertError(error as any);
    } finally {
      set({ loading: false });
    }
  },

  updateProposal: async (proposalId, proposal) => {
    try {
      await httpClient.patch(`/proposal/${proposalId}`, proposal);
      toast.success("Postulación actualizada correctamente");
    } catch (error) {
      showAlertError(error as any);
    }
  },
}));

export default useProposalStore;
