import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import useAuthStore from "../../store/auth/auth.store";
import { Project } from "../../store/project/types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProposalDto } from "../../store/proposal/types";

interface Props {
  project: Project;
  onEdit?: (projectId: Project) => void;
  onDelete?: (projectId: Project) => void;
  // onApply?: (projectId: Project) => void;
  onCreateProposal?: (salary: number, days: number) => Promise<void>;
  onApply?: (proposal: ProposalDto) => Promise<void>;
}

function FooterCard({ project, onCreateProposal, onDelete, onEdit }: Props) {
  const userLogged = useAuthStore((state) => state.userLogged);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [salary, setSalary] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    onEdit?.(project);
  };

  const handleDelete = () => {
    onDelete?.(project);
  };

  // const handleApply = () => {
  //   if (!userLogged?._id) {
  //     Swal.fire({
  //       title: "Inicia sesión",
  //       text: "Debes iniciar sesión para postularte a este proyecto",
  //       icon: "warning",
  //       confirmButtonText: "Aceptar",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/auth/login");
  //       }
  //     });
  //     return;
  //   }

  //   onApply?.(project);
  // };

  const handleOpenApplyDialog = () => {
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
    setVisible(true);
  };

  // const handleApply = async () => {
  //   if (!userLogged?._id || !onApply) return;

  //   if (salary <= 0 || days <= 0) {
  //     Swal.fire({
  //       title: "Datos inválidos",
  //       text: "El salario y los días deben ser mayores a cero",
  //       icon: "warning",
  //       timer: 1500,
  //       showConfirmButton: false,
  //       didOpen: () => {
  //         const container = Swal.getContainer();
  //         if (container) container.style.zIndex = "99999";
  //       },
  //     });
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     if (!project?._id || typeof project._id !== "string") {
  //       throw new Error("ID del proyecto inválido");
  //     }

  //     const proposal: ProposalDto = {
  //       userId: userLogged._id,
  //       projectId: project._id.trim(),
  //       nameProject: project.name.trim(),
  //       userName: userLogged.name.trim(),
  //       userEmail: userLogged.email.trim(),
  //       status: "pendiente",
  //       salary: Number(salary),
  //       days: Number(days),
  //     };

  //     console.log("Enviando proposal:", proposal);

  //     await onApply(proposal);
  //     setVisible(false);
  //     Swal.fire({
  //       title: "¡Postulación exitosa!",
  //       text: "Tu postulación ha sido enviada correctamente",
  //       icon: "success",
  //       confirmButtonText: "Aceptar",
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error",
  //       text: "Ocurrió un error al enviar tu postulación",
  //       icon: "error",
  //       confirmButtonText: "Aceptar",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleApply = async () => {
    if (!userLogged?._id || !onCreateProposal) return;

    if (salary <= 0 || days <= 0) {
      Swal.fire({
        title: "Datos inválidos",
        text: "El salario y los días deben ser mayores a cero",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
        didOpen: () => {
          const container = Swal.getContainer();
          if (container) container.style.zIndex = "99999";
        },
      });
      return;
    }

    setLoading(true);
    try {
      await onCreateProposal(salary, days);
      setVisible(false);
      Swal.fire({
        title: "¡Postulación exitosa!",
        text: "Tu postulación ha sido enviada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar tu postulación",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProposals = () => {
    navigate(`/project/${project._id}`);
  };

  const isOwner = userLogged?._id === project.userId;
  const isFreelance = userLogged?.isFreelancer;

  const dialogFooter = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Enviar"
        icon="pi pi-check"
        onClick={handleApply}
        loading={loading}
      />
    </div>
  );

  return (
    <>
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

        {!isOwner && isFreelance && (
          <div className="self-end">
            <Button
              label="Postularse"
              size="small"
              severity="info"
              icon="pi pi-check"
              iconPos="right"
              // onClick={handleApply}
              onClick={handleOpenApplyDialog}
            />
          </div>
        )}
      </section>

      <Dialog
        visible={visible}
        style={{ width: "450px" }}
        header="Postularse al proyecto"
        modal
        footer={dialogFooter}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="salary">Salario propuesto ($)</label>
            <InputNumber
              id="salary"
              value={salary}
              onValueChange={(e) => setSalary(e.value || 0)}
              mode="currency"
              currency="USD"
              locale="en-US"
              min={0}
            />
          </div>

          <div className="field mt-4">
            <label htmlFor="days">Días estimados de trabajo</label>
            <InputNumber
              id="days"
              value={days}
              onValueChange={(e) => setDays(e.value || 1)}
              min={1}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default FooterCard;
