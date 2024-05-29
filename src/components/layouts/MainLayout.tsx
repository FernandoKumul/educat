import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return ( 
    <>
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    </>
  );
}
 
export default MainLayout;