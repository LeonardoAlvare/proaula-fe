import { Card } from "primereact/card";
import FooterCard from "./footerCard";
import { Project } from "../../store/project/types";
import { formatCurrency, formatDate } from "../../helpers/util";
import Swal from "sweetalert2";
import { ProposalDto } from "../../store/proposal/types";
import useAuthStore from "../../store/auth/auth.store";
import useProposalStore from "../../store/proposal/proposal.store";
import useProjectStore from "../../store/project/project.store";

interface Props {
  project: Project;
  onEdit?: (project: Project) => void;
  hideFooter?: boolean;
}

function ProjectCard({ project, hideFooter = false, onEdit }: Props) {
  const userLogged = useAuthStore((state) => state.userLogged);
  const createProposal = useProposalStore((state) => state.createProposal);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  // const onApply = (projectId: Project) => {
  //   const payload: ProposalDto = {
  //     userId: userLogged?._id!,
  //     projectId: projectId._id,
  //     nameProject: projectId.name,
  //     userName: `${userLogged?.name} ${userLogged?.lastname}`,
  //     userEmail: userLogged?.email!,
  //   };
  //   createProposal(payload);
  // };

  const prepareProposalData = (salary: number, days: number): ProposalDto => {
    return {
      userId: userLogged?._id!,
      projectId: project._id,
      nameProject: project.name,
      userName: `${userLogged?.name} ${userLogged?.lastname}`,
      userEmail: userLogged?.email!,
      status: "pending",
      salary,
      days,
    };
  };

  const onDelete = (projectId: Project) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este proyecto después de eliminarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(projectId._id);
      }
    });
  };

  return (
    <>
      <Card
        key={project._id}
        title={project.name}
        className="mt-4 w-full"
        footer={
          !hideFooter && (
            <FooterCard
              project={project}
              // onApply={onApply}
              onDelete={onDelete}
              onEdit={onEdit}
              onCreateProposal={(salary, days) =>
                createProposal(prepareProposalData(salary, days))
              }
            />
          )
        }
      >
        <div className="flex flex-col h-full">
          <div className="min-h-[100px] max-h-[100px] overflow-y-auto mb-4">
            <p>{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            {project.techs.map((tech) => (
              <span key={tech} className="bg-gray-200 p-1 px-4 rounded-lg">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2 text-gray-500 text-sm mb-4">
            <time>{formatDate(project.dateInit.toString())}</time>-
            <time>{formatDate(project.dateEnd.toString())}</time>
          </div>
          <div className="mt-auto">
            <span className="text-2xl font-bold text-gray-500">
              Salario: {formatCurrency(project.salary)}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProjectCard;
