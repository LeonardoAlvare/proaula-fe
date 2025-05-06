import ChangePassForm from "../../components/change-pass-form/ChangePassForm";
import UserForm from "../../components/user-form/UserForm";

function Profile() {
  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
