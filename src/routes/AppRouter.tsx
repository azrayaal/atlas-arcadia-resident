import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ResidentLayout } from "../components/layouts/ResidentLayout"
import { ResidentHome } from "../modules/resident-app/ResidentHome"
import { AccessPage } from "../modules/resident-app/AccessPage"
import { BookingPage } from "../modules/resident-app/BookingPage"
import { RewardsPage } from "../modules/resident-app/RewardsPage"
import { BillingPage } from "../modules/resident-app/BillingPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResidentLayout />,
    children: [
      { index: true, element: <ResidentHome /> },
      { path: "access", element: <AccessPage /> },
      { path: "booking", element: <BookingPage /> },
      { path: "rewards", element: <RewardsPage /> },
      { path: "billing", element: <BillingPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
