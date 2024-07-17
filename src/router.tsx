import { createBrowserRouter, Navigate } from "react-router-dom";
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
import InstructorEdit from "./pages/InstructorEdit";
import CoursePage from "./pages/CoursePage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/Guard/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import TakingCourse from "./pages/TakingCourse";
import SuccessPaymentPage from "./pages/SuccessfulpaymentPage";
import UserCourses from "./pages/UserCourses";
import InstructorCoursePage from "./pages/InstructorCoursePage";

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
        path: "/pago-exitoso",
        element: <SuccessPaymentPage />
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
            path: '',
            element: <Navigate to="/instructor/profile" replace />
          },
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
            path: "courses",
            element: <InstructorGuard />,
            children: [
              {
                path: '',
                element: <InstructorCoursePage />,
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
          {
            path: "edit",
            element: <InstructorGuard />,
            children: [
              {
                path: '',
                element: <InstructorEdit />,
              }
            ]
          }
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
          {
            path: "/course/:courseId",
            element: <CoursePage />,
          },
          {
            path: "/course/units/:courseId",
            element: <ProtectedRoute />,
            children: [
              {
                path: '',
                element: <TakingCourse />,
              }
            ]
          },
          {
            path: "cart",
            element: <ProtectedRoute />,
            children: [
              {
                path: '',
                element: <CartPage />,
              }
            ]
          },
          {
            path: "checkout",
            element: <ProtectedRoute />,
            children: [
              {
                path: '',
                element: <CheckoutPage />,
              }
            ]
          },
          {
            path: "my-courses",
            element: <ProtectedRoute />,
            children: [{
              path: '',
              element: <UserCourses />,
            }]
          }
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