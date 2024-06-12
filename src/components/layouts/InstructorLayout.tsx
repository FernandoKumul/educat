import { Outlet } from "react-router-dom";
import HeaderInstructor from "./HeaderInstructor";

const InstructorLayout = () => {
  return ( 
    <div className="flex min-h-screen">
      <aside className="min-w-56">
        Sidebar
      </aside>
      <div className="flex-grow">
        <HeaderInstructor />
        <Outlet />
      </div>
    </div>
  );
}
 
export default InstructorLayout;