import { Button } from "primereact/button";
import useAuthStore from "../../store/auth/auth.store";
import { Project } from "../../store/project/types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  project: Project;
  onEdit?: (projectId: Project) => void;
  onDelete?: (projectId: Project) => void;
  onApply?: (projectId: Project) => void;
}

function FooterCard({ project, onApply, onDelete, onEdit }: Props) {
  const userLogged = useAuthStore((state) => state.userLogged);
  const navigate = useNavigate();

  const handleEdit = () => {
    onEdit?.(project);
  };

  const handleDelete = () => {
    onDelete?.(project);
  };

  const handleApply = () => {
    if (!userLogged?._id) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para postularte a este proyecto",
        icon: "warning",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }

    onApply?.(project);
  };

  const handleProposals = () => {
    navigate(`/project/${project._id}`);
  };

  const isOwner = userLogged?._id === project.userId;

  return (
    <section className="w-full flex gap-4 items-center justify-end">
      {isOwner && (
        <div className="flex flex-wrap gap-4">
          <Button
            label="Editar"
            icon="pi pi-cog"
            iconPos="right"
            size="small"
            onClick={handleEdit}
          />

          <Button
            label="Eliminar"
            severity="danger"
            icon="pi pi-trash"
            iconPos="right"
            size="small"
            onClick={handleDelete}
          />

          <Button
            label="Postulaciones"
            severity="secondary"
            icon="pi pi-users"
            iconPos="right"
            size="small"
            onClick={handleProposals}
          />
        </div>
      )}

      {!isOwner && (
        <div className="self-end">
          <Button
            label="Postularse"
            size="small"
            severity="info"
            icon="pi pi-check"
            iconPos="right"
            onClick={handleApply}
          />
        </div>
      )}
    </section>
  );
}

export default FooterCard;
