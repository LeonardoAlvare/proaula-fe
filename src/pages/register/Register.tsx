import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useAuthStore from "../../store/auth/auth.store";
import { UserDto } from "../../store/user/types";

const registerSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  lastname: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Las contraseñas no coinciden"
  ),
  isFreelancer: Yup.boolean(),
  github: Yup.string().when("isFreelancer", {
    is: true,
    then: (schema) => schema.required("El usuario de Github es requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function Register() {
  const [isFreelancer, setIsFreelancer] = useState(false);
  const registerUser = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);

  const { register, handleSubmit, formState, watch, control } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;

  useEffect(() => {
    watch((value) => {
      setIsFreelancer(value.isFreelancer!);
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const { confirmPassword, github, ...rest } = data;
    const payload: UserDto = {
      ...rest,
      isFreelancer: rest.isFreelancer,
      socialMedia: (data.isFreelancer ? [github] : []) as string[],
    };

    await registerUser(payload);
  });

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };

  return (
    <Card title="Registro" className="w-full max-w-2xl">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        onSubmit={onSubmit}
      >
        <div className="col-span-1">
          <FloatLabel>
            <InputText
              {...register("name")}
              id="name"
              name="name"
              className="w-full"
            />
            <label htmlFor="name">Nombre</label>
          </FloatLabel>
          {renderFieldError("name")}
        </div>

        <div className="col-span-1">
          <FloatLabel>
            <InputText
              {...register("lastname")}
              id="lastname"
              name="lastname"
              className="w-full"
            />
            <label htmlFor="lastname">Apellido</label>
          </FloatLabel>
          {renderFieldError("lastname")}
        </div>

        <div className="col-span-2">
          <FloatLabel>
            <InputText
              {...register("email")}
              id="email"
              name="email"
              className="w-full"
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          {renderFieldError("email")}
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FloatLabel>
                <Password
                  {...field}
                  id="password"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                />
                <label htmlFor="password">Contraseña</label>
              </FloatLabel>
            )}
          />
          {renderFieldError("password")}
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FloatLabel>
                <Password
                  {...field}
                  id="confirmPassword"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                  feedback={false}
                />
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
              </FloatLabel>
            )}
          />
          {renderFieldError("confirmPassword")}
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="isFreelancer"
            render={({ field }) => (
              <div className="flex align-items-center">
                <Checkbox
                  inputId="isFreelancer"
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  checked={!!field.value}
                />
                <label htmlFor="isFreelancer" className="ml-2">
                  Soy freelancer
                </label>
              </div>
            )}
          />
          {renderFieldError("isFreelancer")}
        </div>

        {isFreelancer && (
          <div className="col-span-2">
            <FloatLabel>
              <InputText
                {...register("github")}
                id="github"
                name="github"
                className="w-full"
              />
              <label htmlFor="github">Github url</label>
            </FloatLabel>
            {renderFieldError("name")}
          </div>
        )}

        <div className="col-span-2">
          <Button
            loading={loading}
            label="Registrarse"
            className="block w-full"
          />
        </div>

        <div className="col-span-2">
          <p className="text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}

export default Register;
