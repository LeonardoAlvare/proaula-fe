import { Button } from "primereact/button";
import ChangePassForm from "../../components/change-pass-form/ChangePassForm";
import UserForm from "../../components/user-form/UserForm";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2">
        <Button
          icon="pi pi-arrow-left"
          className="mb-4"
          label="Volver"
          text
          onClick={() => navigate("/landing")}
        />
      </div>

      <div className="col-span-1">
        <UserForm />
      </div>

      <div className="col-span-1">
        <ChangePassForm />
      </div>
    </section>
  );
}

export default Profile;
