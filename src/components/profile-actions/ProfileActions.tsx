import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth/auth.store";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";

export default function ProfileActions() {
  const user = useAuthStore((state) => state.userLogged);
  const logout = useAuthStore((state) => state.logout);
  const fullname = `${user?.name} ${user?.lastname}`;
  const menuLeft = useRef<Menu>(null);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      label: "Perfil",
      icon: "pi pi-user",
      command: () => navigate(`/profile`),
    },

    {
      label: "Mis postulaciones",
      icon: "pi pi-list",
      command: () => navigate(`/proposal/${user?._id}`),
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: logout,
    },
  ];

  return (
    <Button
      text
      className="flex items-center gap-2 cursor-pointer"
      onClick={(event) => menuLeft?.current?.toggle(event)}
      aria-controls="popup_menu_left"
      aria-haspopup
    >
      <Avatar
        image={`https://ui-avatars.com/api/?name=${fullname}&format=svg&background=random&bold=true`}
        size="large"
        shape="circle"
      />
      <span className="font-bold text-bluegray-50">{fullname}</span>
      <Ripple />
      <Menu model={menuItems} popup ref={menuLeft} id="popup_menu_left" />
    </Button>
  );
}
