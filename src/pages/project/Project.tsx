import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "../../store/project/project.store";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/project-card/ProjectCard";
import useProposalStore from "../../store/proposal/proposal.store";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useConfirmDialog } from "../../components/confirm-dialog/ConfirmDialog";
import { StatusProposal } from "../../store/proposal/types";
import { borderClassByStatus } from "../../helpers/util";
import useUserStore from "../../store/user/user.store";
import { UserDto } from "../../store/user/types";
import { Dialog } from "primereact/dialog";

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

  const getUserById = useUserStore((state) => state.getUserById);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const handleViewProfile = async (userId: string) => {
    console.log("Intentando obtener usuario con ID:", userId);
    try {
      const user = await getUserById(userId);
      console.log("Usuario obtenido:", user);
      setSelectedUser(user);
      setShowProfileDialog(true);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      setSelectedUser(null);
      setShowProfileDialog(true); // Mostrar diálogo incluso con error
    }
  };

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
        // await updateProposal(proposalId, { status: StatusProposal.Accept });
        // await getProposalByProjectId(projectId!);
        try {
          // Primero aceptamos la postulación seleccionada
          await updateProposal(proposalId, { status: StatusProposal.Accept });

          // Luego rechazamos todas las demás postulaciones
          const otherProposals = proposals.filter(
            (p) => p._id !== proposalId && p.status !== StatusProposal.Reject
          );
          const rejectPromises = otherProposals.map((p) =>
            updateProposal(p._id, { status: StatusProposal.Reject })
          );

          await Promise.all(rejectPromises);

          // Finalmente actualizamos la lista de postulaciones
          await getProposalByProjectId(projectId!);
        } catch (error) {
          console.error("Error al actualizar postulaciones:", error);
        }
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
                      icon="pi pi-eye"
                      rounded
                      text
                      raised
                      aria-label="View Profile"
                      className="w-8 h-8 p-0"
                      onClick={() => {
                        handleViewProfile(proposal.userId);
                      }}
                    />

                    {proposal.status === StatusProposal.Pending && (
                      <>
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
                      </>
                    )}
                    {proposal.status !== StatusProposal.Pending && (
                      <span
                        className={`p-tag ${
                          proposal.status === StatusProposal.Accept
                            ? "p-tag-success"
                            : "p-tag-danger"
                        }`}
                      >
                        {proposal.status === StatusProposal.Accept
                          ? "Aceptado"
                          : "Rechazado"}
                      </span>
                    )}
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
                <p>
                  <strong className="mr-2">Salario:</strong>
                  {proposal.salary}
                </p>
                <p>
                  <strong className="mr-2">Dias:</strong>
                  {proposal.days}
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
      <Dialog
        header="Perfil del postulante"
        visible={showProfileDialog}
        style={{ width: "400px" }}
        modal
        onHide={() => {
          setShowProfileDialog(false);
          setSelectedUser(null); // Resetear el usuario al cerrar
        }}
      >
        {selectedUser ? (
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {selectedUser.name}{" "}
              {selectedUser.lastname}
            </p>
            <p>
              <strong>Correo:</strong> {selectedUser.email}
            </p>

            {selectedUser.socialMedia &&
              selectedUser.socialMedia.length > 0 && (
                <div>
                  <strong>Redes sociales:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {selectedUser.socialMedia.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedUser.idioma && selectedUser.idioma.length > 0 && (
              <p>
                <strong>Idiomas:</strong> {selectedUser.idioma.join(", ")}
              </p>
            )}

            {selectedUser.experiencia && (
              <p>
                <strong>Experiencia:</strong> {selectedUser.experiencia}
              </p>
            )}

            {selectedUser.categoria && selectedUser.categoria.length > 0 && (
              <p>
                <strong>Categorías:</strong> {selectedUser.categoria.join(", ")}
              </p>
            )}
          </div>
        ) : (
          <p>No se pudo cargar la información del usuario</p>
        )}
      </Dialog>
    </section>
  );
}

export default Project;
