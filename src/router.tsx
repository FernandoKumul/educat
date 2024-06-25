import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import CourseSearch from "./pages/CourseSearch";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailSendPage from "./pages/EmailSendPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./contexts/AuthProvider";
import UnAuthGuard from "./components/Guard/UnAuthGuard";
import InstructorGuard from "./components/Guard/InstructorGuard";
import EditCourse from "./pages/EditCourse";
import InstructorLayout from "./components/layouts/InstructorLayout";
import InstructorProfile from "./pages/InstructorProfile";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider />,
    children: [
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
        element: <UnAuthGuard />,
        children: [
          {
            path: '',
            element: <RegisterPage />
          }
        ]
      },
      {
        path: "/login",
        element: <UnAuthGuard />,
        children: [
          {
            path: '',
            element: <LoginPage />
          }
        ]
      },
      {
        path: '/instructor',
        element: <InstructorLayout />,
        children: [
          {
            path: "edit-course/:courseId",
            element: <InstructorGuard />,
            children: [
              {
                path: '',
                element: <EditCourse />
              }
            ]
          },
          {
            path: "profile",
            element: <InstructorGuard />,
            children: [
              {
                path: '',
                element: <InstructorProfile />,
              }
            ]
          },
        ]
      },      
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/search",
            element: <CourseSearch />,
          },
        ]
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

export default router