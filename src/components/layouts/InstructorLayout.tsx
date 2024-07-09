import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderInstructor from "./HeaderInstructor";
import InstructorSidebar from "./InstructorSidebar";
import { ToastContainer } from "react-toastify";

const InstructorLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return ( 
    <div className="flex h-screen max-sm:relative">
      <InstructorSidebar openSidebar={isOpen} handleSidebar={handleSidebar}/>
      <div className="flex-grow overflow-auto flex flex-col">
        <HeaderInstructor handleSidebar={handleSidebar} />
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