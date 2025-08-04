// src/router/router.ts
import { Dashboard } from "@/components/Dashboard";
import { Layout } from "@/components/Layout";
import { LoanManagement } from "@/components/LoanManagement";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "dashboard", element: <Dashboard /> },
      { path: "loans", element: <LoanManagement /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
