import { Outlet } from "react-router-dom";
import HeaderInstructor from "./HeaderInstructor";
import InstructorSidebar from "./InstructorSidebar";
import { ToastContainer } from "react-toastify";

const InstructorLayout = () => {
  return ( 
    <div className="flex h-screen">
      <InstructorSidebar />
      <div className="flex-grow overflow-auto flex flex-col">
        <HeaderInstructor />
        <Outlet />
      </div>
      <ToastContainer
        className="text-sm"
        position="top-right"
        theme="dark"
      />
    </div>
  );
}
 
export default InstructorLayout;