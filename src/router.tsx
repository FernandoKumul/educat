import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailSendPage from "./pages/EmailSendPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/verify-email",
    
    element: <VerifyEmailPage />
  },
  {
    path: "/email-send/:email",
    element: <EmailSendPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ]
  },
]);

export default router