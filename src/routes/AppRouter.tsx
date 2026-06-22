import { createBrowserRouter, RouterProvider, Navigate, useRouteError, isRouteErrorResponse } from "react-router-dom"
import { ResidentLayout } from "../components/layouts/ResidentLayout"
import { ResidentHome } from "../modules/resident-app/ResidentHome"
import { AccessPage } from "../modules/resident-app/AccessPage"
import { BookingPage } from "../modules/resident-app/BookingPage"
import { RewardsPage } from "../modules/resident-app/RewardsPage"
import { BillingPage } from "../modules/resident-app/BillingPage"
import { BookingDetailPage } from "../modules/resident-app/BookingDetailPage"
import { RewardDetailPage } from "../modules/resident-app/RewardDetailPage"
import { PaymentDetailPage } from "../modules/resident-app/PaymentDetailPage"
import { AllNotificationsPage } from "../modules/resident-app/AllNotificationsPage"
import { NotificationDetailPage } from "../modules/resident-app/NotificationDetailPage"

function RouteErrorPage() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : null
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
    ? error.message
    : "Terjadi kesalahan yang tidak diketahui"

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-100 via-stone-50 to-zinc-100">
      <div className="w-[390px] bg-stone-50 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <span className="text-3xl">{status === 404 ? "🔍" : "⚠️"}</span>
        </div>
        <div>
          <p className="text-4xl font-bold text-zinc-800">{status ?? "Error"}</p>
          <p className="text-lg font-semibold text-zinc-700 mt-1">
            {status === 404 ? "Halaman Tidak Ditemukan" : "Ups, ada masalah!"}
          </p>
        </div>
        <p className="text-sm text-zinc-500">{message}</p>
        <a
          href="/resident"
          className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/resident" replace />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: "/resident",
    element: <ResidentLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <ResidentHome /> },
      { path: "access", element: <AccessPage /> },
      { path: "booking", element: <BookingPage /> },
      { path: "booking/:id", element: <BookingDetailPage /> },
      { path: "rewards", element: <RewardsPage /> },
      { path: "rewards/:id", element: <RewardDetailPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "billing/:id", element: <PaymentDetailPage /> },
      { path: "notifications", element: <AllNotificationsPage /> },
      { path: "notifications/:id", element: <NotificationDetailPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
