import { useEffect, useState } from "react";
import useProjectStore from "../../store/project/project.store";

import { Button } from "primereact/button";
import ProjectCard from "../../components/project-card/ProjectCard";
import useAuthStore from "../../store/auth/auth.store";
import ProjectForm from "../../components/project-form/ProjectForm";
import { Project } from "../../store/project/types";

function Home() {
  const getAllProjects = useProjectStore((state) => state.getAllProjects);
  const getProjectByUserId = useProjectStore(
    (state) => state.getProjectByUserId
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  const projects = useProjectStore((state) => state.projects);

  const [showForm, setShowForm] = useState(false);
  const [projectSelected, setProjectSelected] = useState<Project | undefined>(
    undefined
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (userLogged?.isFreelancer) {
      getAllProjects();
    } else {
      getProjectByUserId(userLogged?._id!);
    }
  }, [userLogged]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const onHideForm = () => {
    setShowForm(false);
    setProjectSelected(undefined);
  };

  const onEdit = (projectId: Project) => {
    setProjectSelected(projectId);
    setShowForm(true);
  };

  return (
    <section>
      <div className="w-full flex justify-end items-center">
        <Button
          label="Crear proyecto"
          icon="pi pi-plus"
          iconPos="right"
          onClick={handleShowForm}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} onEdit={onEdit} />
        ))}
      </div>

      {projects.length === 0 && (
        <section className="w-full flex flex-col justify-center items-center mt-40">
          <figure className="w-1/2">
            <img
              src="/empty.svg"
              alt="No hay proyectos"
              className="w-full h-32"
            />
          </figure>
          <h1 className="text-3xl font-bold text-gray-500">No hay proyectos</h1>
        </section>
      )}

      <ProjectForm
        defaultValues={projectSelected}
        visible={showForm}
        onHide={onHideForm}
      />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </section>
  );
}

export default Home;
