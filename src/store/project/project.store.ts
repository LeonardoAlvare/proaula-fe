import { create } from "zustand";
import { ProjectAction, ProjectState } from "./types";
import { httpClient } from "../../plugins/axios";
import { showAlertError } from "../../helpers/util";
import { toast } from "sonner";

const initialState: ProjectState = {
  projects: [],
  allProjects: [],
  loading: false,
  project: null,
};

const useProjectStore = create<ProjectState & ProjectAction>((set, get) => ({
  ...initialState,

  async getAllProjects(nameFilter) {
    try {
      set({ loading: true });
      const { data } = await httpClient.get("/project", {
        params: {
          nameFilter,
        },
      });
      set({ allProjects: data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  async getProjectByUserId(userId) {
    try {
      const { data } = await httpClient.get(`/project/user/${userId}`);
      set({ projects: data });
    } catch (error) {
      console.error(error);
    }
  },

  async getProjectById(id) {
    try {
      set({ loading: true });
      const { data } = await httpClient.get(`/project/${id}`);
      set({ project: data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  async createProject(project) {
    try {
      set({ loading: true });
      await httpClient.post("/project", project);
      get().getAllProjects();
      toast.success("Proyecto creado correctamente");
      return true;
    } catch (error) {
      showAlertError(error as any);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  async EditProject(id, project) {
    try {
      set({ loading: true });
      await httpClient.patch(`/project/${id}`, project);
      get().getAllProjects();
      toast.success("Proyecto actualizado correctamente");
      return true;
    } catch (error) {
      showAlertError(error as any);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  async deleteProject(id) {
    try {
      set({ loading: true });
      await httpClient.delete(`/project/${id}`);
      get().getAllProjects();
      toast.success("Proyecto eliminado correctamente");
      return true;
    } catch (error) {
      showAlertError(error as any);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProjectStore;
