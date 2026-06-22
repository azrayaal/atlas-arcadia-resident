import { useMemo } from "react"
import { Bell, ChevronLeft, Trash2 } from "lucide-react"
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"
import type { Notification } from "../../types"

export function NotificationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { homeNotifications, removeNotification } = useOutletContext<{
    homeNotifications: Notification[]
    removeNotification: (id: string) => void
  }>()

  const notification = useMemo(
    () => homeNotifications.find((notif) => notif.id === id),
    [homeNotifications, id]
  )

  if (!notification) {
    return (
      <div className="pb-6 px-4 pt-4">
        <button onClick={() => navigate(-1)} className="rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-100 transition">
          <ChevronLeft size={18} />
        </button>
        <div className="mt-6 rounded-3xl bg-zinc-50 border border-zinc-200 p-6 text-center text-zinc-500">
          Notifikasi tidak ditemukan.
        </div>
      </div>
    )
  }

  return (
    <div className="pb-6 px-4 pt-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-100 transition">
          <ChevronLeft size={18} />
        </button>
        <div>
          <p className="text-xs text-zinc-400">Detail Notifikasi</p>
          <h1 className="text-lg font-bold text-zinc-900">{notification.title}</h1>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-3xl flex items-center justify-center ${
            notification.type === "success" ? "bg-emerald-100 text-emerald-700" : notification.type === "warning" ? "bg-amber-100 text-amber-700" : notification.type === "alert" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
          }`}>
            <Bell size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{notification.type}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{notification.time}</p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-sm font-semibold text-zinc-900">Pesan</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">{notification.message}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/resident/notifications" className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 transition">
            Kembali ke Semua Notifikasi
          </Link>
          <button
            onClick={() => {
              removeNotification(notification.id)
              navigate("/resident/notifications")
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition"
          >
            <Trash2 size={16} className="mr-2" /> Hapus Notifikasi
          </button>
        </div>
      </div>
    </div>
  )
}
