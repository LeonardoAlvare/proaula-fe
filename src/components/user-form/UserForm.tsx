import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import useUserStore from "../../store/user/user.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDto } from "../../store/user/types";
import useAuthStore from "../../store/auth/auth.store";
import { Checkbox } from "primereact/checkbox";

const userSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  lastname: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es requerido"),
  isFreelancer: Yup.boolean(),
  github: Yup.string().when("isFreelancer", {
    is: true,
    then: (schema) => schema.required("El usuario de Github es requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function UserForm() {
  const [isFreelancer, setIsFreelancer] = useState(false);
  const updateUser = useUserStore((state) => state.updateUser);
  const loading = useUserStore((state) => state.loading);
  const userLogged = useAuthStore((state) => state.userLogged);

  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm({
      resolver: yupResolver(userSchema),
    });
  const { errors } = formState;

  useEffect(() => {
    watch((value) => {
      setIsFreelancer(value.isFreelancer!);
    });
  }, []);

  useEffect(() => {
    setValue("name", userLogged?.name!);
    setValue("lastname", userLogged?.lastname!);
    setValue("email", userLogged?.email!);
    setValue("isFreelancer", userLogged?.isFreelancer!);
    setValue("github", userLogged?.socialMedia![0]);
  }, [userLogged]);

  const onSubmit = handleSubmit(async (data) => {
    const { github, ...rest } = data;
    const payload: UserDto = {
      ...rest,
      isFreelancer: rest.isFreelancer,
      socialMedia: (data.isFreelancer
        ? [github]
        : userLogged?.socialMedia) as string[],
    };

    await updateUser(userLogged?._id!, payload);
  });

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };

  return (
    <Card title="Perfil" className="w-full">
      <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
        <div className="col-span-1">
          <label htmlFor="name" className="block text-gray-700">
            Nombre
          </label>
          <InputText
            {...register("name")}
            id="name"
            name="name"
            className="w-full"
          />
          {renderFieldError("name")}
        </div>

        <div className="col-span-1">
          <label htmlFor="name" className="block text-gray-700">
            Apellido
          </label>
          <InputText
            {...register("lastname")}
            id="lastname"
            name="lastname"
            className="w-full"
          />
          {renderFieldError("lastname")}
        </div>

        <div className="col-span-2">
          <label htmlFor="name" className="block text-gray-700">
            Email
          </label>
          <InputText
            {...register("email")}
            id="email"
            name="email"
            className="w-full"
          />

          {renderFieldError("email")}
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
            <label htmlFor="name" className="block text-gray-700">
              Github url
            </label>
            <InputText
              {...register("github")}
              id="github"
              name="github"
              className="w-full"
            />
            {renderFieldError("github")}
          </div>
        )}

        <div className="col-span-2">
          <Button loading={loading} label="Guardar" className="block w-full" />
        </div>
      </form>
    </Card>
  );
}

export default UserForm;
