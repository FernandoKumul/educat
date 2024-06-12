import { Outlet } from "react-router-dom";
import HeaderInstructor from "./HeaderInstructor";
import InstructorSidebar from "./InstructorSidebar";

const InstructorLayout = () => {
  return ( 
    <div className="flex h-screen">
      <InstructorSidebar />
      <div className="flex-grow overflow-auto">
        <HeaderInstructor />
        <Outlet />
      </div>
    </div>
  );
}
 
export default InstructorLayout;