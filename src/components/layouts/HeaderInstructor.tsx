import { RiMenuLine, RiUserLine } from "@remixicon/react";
import { Link } from "react-router-dom";

type HeaderInstructorProps = {
  handleSidebar: () => void;
};

const HeaderInstructor = ({handleSidebar}: HeaderInstructorProps) => {
  return (
    <header className="flex bg-header justify-end">
      <Link to={'/instructor/profile'}>
        <RiUserLine className="size-7 m-3 mr-6 max-sm:hidden" />
      </Link>
      <RiMenuLine onClick={handleSidebar} className="size-7 m-3 mr-6 hidden max-sm:block" />
    </header>
  );
}

export default HeaderInstructor;