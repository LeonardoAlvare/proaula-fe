import { Toolbar } from "primereact/toolbar";
import ProfileActions from "../profile-actions/ProfileActions";

function Header() {
  const startContent = (
    <>
      <img alt="Logo" src="/logo.png" className="w-20 h-auto" />
    </>
  );

  const endContent = (
    <>
      <ProfileActions />
    </>
  );

  return (
    <div>
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
}

export default Header;
