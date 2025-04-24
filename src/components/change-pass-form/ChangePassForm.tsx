import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import useAuthStore from "../../store/auth/auth.store";
import { ChangePassword } from "../../store/auth/types";

const changePassSchema = Yup.object({
  oldPassword: Yup.string().required("La contraseña es requerida"),
  newPassword: Yup.string().min(7, "Minimo 7 caracteres").required("La contraseña es requerida"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Las contraseñas no coinciden"
  ),
});

function ChangePassForm() {
  const loading = useAuthStore((state) => state.loading);
  const changePassword = useAuthStore((state) => state.changePassword);
  const userLogged = useAuthStore((state) => state.userLogged);

  const { handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(changePassSchema),
  });
  const { errors } = formState;

  const resetForm = () => {
    setValue("oldPassword", "");
    setValue("newPassword", "");
    setValue("confirmNewPassword", "");
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload: ChangePassword = {
      email: userLogged?.email!,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    };
    const isSuccess = await changePassword(userLogged?._id!, payload);

    if (isSuccess) {
      resetForm();
    }
  });

  const renderFieldError = (field: keyof typeof errors) => {
    return errors[field]?.message ? (
      <small className="text-red-500">{errors[field].message}</small>
    ) : null;
  };
  return (
    <Card title="Cambiar contraseña" className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="col-span-1">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <>
                <label htmlFor="oldPassword" className="block text-gray-700">
                  Contraseña antigua
                </label>
                <Password
                  {...field}
                  value={field.value}
                  id="oldPassword"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                  feedback={false}
                />
              </>
            )}
          />
          {renderFieldError("oldPassword")}
        </div>

        <div className="col-span-1">
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <>
                <label htmlFor="newPassword" className="block text-gray-700">
                  Contraseña nueva
                </label>
                <Password
                  {...field}
                  value={field.value}
                  id="newPassword"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                />
              </>
            )}
          />
          {renderFieldError("newPassword")}
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field }) => (
              <>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-gray-700"
                >
                  Confirmar contraseña nueva
                </label>
                <Password
                  {...field}
                  value={field.value}
                  id="confirmNewPassword"
                  className="block w-full [&_input]:w-full"
                  toggleMask
                  feedback={false}
                />
              </>
            )}
          />
          {renderFieldError("confirmNewPassword")}
        </div>

        <div className="col-span-2">
          <Button loading={loading} label="Guardar" className="block w-full" />
        </div>
      </form>
    </Card>
  );
}

export default ChangePassForm;
