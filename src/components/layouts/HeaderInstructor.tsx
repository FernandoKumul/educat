import { RiMenuLine, RiUserLine } from "@remixicon/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

type HeaderInstructorProps = {
  handleSidebar: () => void;
};

const HeaderInstructor = ({handleSidebar}: HeaderInstructorProps) => {
  const { isUser } = useContext(AuthContext);

  return (
    <header className="flex bg-header justify-end items-center gap-8 min-h-16 px-6">
      <Link to={'/'} className='hover:text-details max-sm:hidden'>Inicio</Link>
      <div className="flex items-center gap-3 max-sm:hidden">
        <p>{isUser?.name}</p>
        {isUser?.avatarUrl ? <img className='rounded-full size-6 object-cover ' src={isUser.avatarUrl} alt="avatar" /> : <RiUserLine />}
      </div>
      <RiMenuLine onClick={handleSidebar} className="size-7 hidden max-sm:block" />
    </header>
  );
}

export default HeaderInstructor;