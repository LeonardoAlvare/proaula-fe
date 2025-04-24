import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useAuthStore from "../../store/auth/auth.store";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

function Login() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { errors } = formState;

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <Card title="Inicio de sesión" className="w-full max-w-2xl">
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div>
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

        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FloatLabel>
                <Password
                  {...field}
                  id="password"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                  feedback={false}
                />
                <label htmlFor="password">Password</label>
              </FloatLabel>
            )}
          />
          {renderFieldError("password")}
        </div>

        <div>
          <Button
            loading={loading}
            label="Iniciar sesión"
            className="block w-full"
          />
        </div>

        <div>
          <p className="text-center">
            Si no tienes cuenta, puedes{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              registrarte
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}

export default Login;
