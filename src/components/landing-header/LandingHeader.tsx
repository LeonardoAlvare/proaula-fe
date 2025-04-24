import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth/auth.store";
import ProfileActions from "../profile-actions/ProfileActions";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useProjectStore from "../../store/project/project.store";

import { useDebounce } from "primereact/hooks";
import { useEffect } from "react";

const filterSchema = Yup.object({
  search: Yup.string().required("El campo es requerido"),
});

export default function LandingHeader() {
  const userLogged = useAuthStore((state) => state.userLogged);
  const findProject = useProjectStore((state) => state.getAllProjects);
  const loadingProjects = useProjectStore((state) => state.loading);
  const [_, debouncedValue, setInputValue] = useDebounce("", 400);
  const { register, formState, handleSubmit, watch } = useForm({
    resolver: yupResolver(filterSchema),
  });
  const { errors } = formState;

  useEffect(() => {
    watch((data) => {
      setInputValue(data?.search || "");
    });
  }, []);

  useEffect(() => {
    findProject(debouncedValue);
  }, [debouncedValue]);

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };

  const onSubmit = handleSubmit((data) => {
    findProject(data.search);
  });

  return (
    <header className="bg-gray-800 rounded-b-xl text-white p-4">
      <div className=" flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          FXP
        </NavLink>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="hover:text-gray-400">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="hover:text-gray-400">
                perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/proposal/${userLogged?._id}`}
                className="hover:text-gray-400"
              >
                Postulaciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/weka" className="hover:text-gray-400">
                weka
              </NavLink>
            </li>
          </ul>
        </nav>

        <div>
          {userLogged ? (
            <ProfileActions />
          ) : (
            <Link
              to="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      <h1 className="font-bold mt-10">
        <span className="font-bold text-4xl">FreelaXprex</span>
        <span className="text-md text-gray-400">
          {" "}
          - Tu plataforma de proyectos freelance
        </span>
      </h1>

      <form className="mt-4 flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="p-inputgroup flex-1">
          <InputText
            {...register("search")}
            invalid={!!errors.search}
            placeholder="Vacante"
            className="rounded-r-none"
          />
          <Button
            icon="pi pi-search"
            className="p-button-warning"
            label="Buscar"
            loading={loadingProjects}
          />
        </div>
        {renderFieldError("search")}
      </form>
    </header>
  );
}
