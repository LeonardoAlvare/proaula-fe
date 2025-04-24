import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { STATUS_PROJECT } from "../../consts";
import { Project, ProjectDto } from "../../store/project/types";
import { useEffect, useState } from "react";
import useProjectStore from "../../store/project/project.store";
import useAuthStore from "../../store/auth/auth.store";

interface Props {
  onHide: () => void;
  visible: boolean;
  defaultValues?: Project;
}

const projectSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  salary: Yup.number().required("El salario es requerido"),
  techs: Yup.array()
    .of(Yup.string())
    .required("Las tecnologias son requeridas"),
  dateInit: Yup.date().required("La fecha de inicio es requerida"),
  dateEnd: Yup.date().required("La fecha de finalización es requerida"),
  description: Yup.string().required("La descripción es requerida"),
  status: Yup.string().notRequired(),
});

function ProjectForm({ onHide, visible, defaultValues }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const createProject = useProjectStore((state) => state.createProject);
  const editProject = useProjectStore((state) => state.EditProject);
  const loading = useProjectStore((state) => state.loading);
  const user = useAuthStore((state) => state.userLogged);

  useEffect(() => {
    setIsEdit(!!defaultValues);
    setFormValues();
  }, [defaultValues]);

  const setFormValues = () => {
    setValue("name", defaultValues?.name!);
    setValue("salary", defaultValues?.salary!);
    setValue("techs", defaultValues?.techs!);
    setValue("dateInit", defaultValues?.dateInit!);
    setValue("dateEnd", defaultValues?.dateEnd!);
    setValue("description", defaultValues?.description!);
    setValue("status", defaultValues?.status!);
  };

  const { register, formState, handleSubmit, control, reset, setValue } =
    useForm({
      resolver: yupResolver(projectSchema),
    });
  const { errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      userId: user?._id,
      ...data,
    };
    let isSuccessful = false;

    if (isEdit) {
      isSuccessful = await editProject(
        defaultValues?._id!,
        payload as ProjectDto
      );
    } else {
      isSuccessful = await createProject(payload as ProjectDto);
    }

    if (isSuccessful) {
      handleOnHide();
    }
  });

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };

  const handleOnHide = () => {
    reset();
    onHide();
  };

  return (
    <Sidebar
      onHide={handleOnHide}
      visible={visible}
      position="right"
      className="w-full md:w-1/2 lg:w-2/5"
      header={
        <h1 className="text-2xl font-bold text-left w-full">
          {isEdit ? "Editar proyecto" : "Crear proyecto"}
        </h1>
      }
    >
      <form
        className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={onSubmit}
      >
        <div className="col-span-2">
          <>
            <label htmlFor="name" className="block text-gray-700">
              Nombre
            </label>
            <InputText
              {...register("name")}
              invalid={!!errors.name}
              id="name"
              name="name"
              className="w-full"
            />
          </>
          {renderFieldError("name")}
        </div>

        <div className="col-span-2">
          <Controller
            name="techs"
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="techs" className="block text-gray-700">
                  Tecnologias
                </label>
                <Chips
                  {...field}
                  invalid={!!errors.techs}
                  name={field.name}
                  value={field.value as string[]}
                  id="techs"
                  className="w-full"
                />
              </>
            )}
          />
          {renderFieldError("techs")}
        </div>

        <div className="col-span-1">
          <>
            <Controller
              name="dateInit"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="dateInit" className="block text-gray-700">
                    Fecha de inicio
                  </label>
                  <Calendar
                    {...field}
                    value={new Date(field.value)}
                    invalid={!!errors.dateInit}
                    id="dateInit"
                    name="dateInit"
                  />
                </>
              )}
            />
          </>
          {renderFieldError("dateInit")}
        </div>

        <div className="col-span-1">
          <>
            <Controller
              name="dateEnd"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="dateEnd" className="block text-gray-700">
                    Fecha de finalización
                  </label>
                  <Calendar
                    {...field}
                    value={new Date(field.value)}
                    invalid={!!errors.dateEnd}
                    id="dateEnd"
                    name="dateEnd"
                  />
                </>
              )}
            />
          </>
          {renderFieldError("dateEnd")}
        </div>

        <div className="col-span-2">
          <>
            <label htmlFor="salary" className="block text-gray-700">
              Salario
            </label>
            <InputText
              {...register("salary")}
              invalid={!!errors.salary}
              type="number"
              id="salary"
              name="salary"
              className="w-full"
            />
          </>
          {renderFieldError("salary")}
        </div>

        <div className="col-span-2">
          <>
            <label htmlFor="description" className="block text-gray-700">
              Descripción
            </label>
            <InputTextarea
              {...register("description")}
              invalid={!!errors.description}
              id="description"
              name="description"
              className="w-full"
            />
          </>
          {renderFieldError("description")}
        </div>

        {isEdit && (
          <div className="col-span-2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="status" className="block text-gray-700">
                    Estado
                  </label>
                  <Dropdown
                    {...field}
                    id="status"
                    name="status"
                    options={STATUS_PROJECT}
                    optionLabel="label"
                    optionValue="value"
                    className="w-full"
                  />
                </>
              )}
            />
          </div>
        )}

        <div className="col-span-2">
          <Button loading={loading} label="Guardar" className="w-full" />
        </div>
      </form>
    </Sidebar>
  );
}

export default ProjectForm;
