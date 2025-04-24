import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "../../store/project/project.store";
import { useEffect } from "react";
import ProjectCard from "../../components/project-card/ProjectCard";
import useProposalStore from "../../store/proposal/proposal.store";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useConfirmDialog } from "../../components/confirm-dialog/ConfirmDialog";
import { StatusProposal } from "../../store/proposal/types";
import { borderClassByStatus } from "../../helpers/util";

function Project() {
  const getProjectById = useProjectStore((state) => state.getProjectById);
  const getProposalByProjectId = useProposalStore(
    (state) => state.getProposalsByProjectId
  );
  const updateProposal = useProposalStore((state) => state.updateProposal);
  const proposals = useProposalStore((state) => state.proposals);
  const project = useProjectStore((state) => state.project);
  const { projectId } = useParams();
  const { showConfirmDialog } = useConfirmDialog();
  const navigate = useNavigate();

  useEffect(() => {
    !!projectId && getProjectById(projectId);
    !!projectId && getProposalByProjectId(projectId);
  }, [projectId]);

  const handleAccept = (proposalId: string) => () => {
    showConfirmDialog({
      header: "Aceptar postulación",
      message: "¿Estás seguro de aceptar esta postulación?",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await updateProposal(proposalId, { status: StatusProposal.Accept });
        await getProposalByProjectId(projectId!);
      },
    });
  };

  const handleReject = (proposalId: string) => () => {
    showConfirmDialog({
      header: "Rechazar postulación",
      message: "¿Estás seguro de rechazar esta postulación?",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await updateProposal(proposalId, { status: StatusProposal.Reject });
        await getProposalByProjectId(projectId!);
      },
    });
  };

  return (
    <section>
      <div>
        <Button
          icon="pi pi-arrow-left"
          className="mb-4"
          label="Volver"
          text
          onClick={() => navigate("/landing")}
        />
      </div>

      {!!project && <ProjectCard project={project} hideFooter />}

      <Panel header="Postulaciones" className="mt-4">
        {proposals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals?.map((proposal) => (
              <Card
                key={proposal._id}
                className={`border ${borderClassByStatus(
                  proposal.status
                )} [&_div]:p-2`}
                footer={
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      icon="pi pi-times"
                      rounded
                      text
                      raised
                      severity="danger"
                      aria-label="Reject"
                      className="w-8 h-8 p-0"
                      onClick={handleReject(proposal._id)}
                    />

                    <Button
                      icon="pi pi-check"
                      rounded
                      text
                      raised
                      aria-label="Accept"
                      className="w-8 h-8 p-0"
                      onClick={handleAccept(proposal._id)}
                    />
                  </div>
                }
              >
                <p>
                  <strong className="mr-2">Nombre:</strong>
                  {proposal.userName}
                </p>
                <p>
                  <strong className="mr-2">Correo:</strong>
                  {proposal.userEmail}
                </p>
              </Card>
            ))}
          </div>
        )}

        {proposals.length === 0 && (
          <section className="w-full flex flex-col justify-center items-center my-10">
            <h1 className="text-2xl font-bold">No hay postulaciones</h1>
            <p className="text-gray-500">
              Aún no hay postulaciones para este proyecto
            </p>
          </section>
        )}
      </Panel>
    </section>
  );
}

export default Project;
