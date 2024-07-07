import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import CartProvider from "../../contexts/CartProvider";

const MainLayout = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer
          className="text-sm"
          position="top-right"
          theme="dark"
        />
      </div>
    </CartProvider>
  );
}

export default MainLayout;