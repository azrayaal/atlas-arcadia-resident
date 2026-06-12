import { motion } from "framer-motion"
import { Bell, Trash2, ChevronLeft } from "lucide-react"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import type { Notification } from "../../types"

export function AllNotificationsPage() {
  const { homeNotifications, removeNotification } = useOutletContext<{ homeNotifications: Notification[]; removeNotification: (id: string) => void }>()
  const navigate = useNavigate()

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 px-4 pt-4">
        <button onClick={() => navigate(-1)} className="rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-100 transition">
          <ChevronLeft size={18} />
        </button>
        <div>
          <p className="text-xs text-zinc-400">Notifikasi</p>
          <h1 className="text-lg font-bold text-zinc-900">Semua Notifikasi</h1>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {homeNotifications.length === 0 ? (
          <div className="rounded-3xl bg-zinc-50 border border-zinc-200 p-6 text-center text-zinc-500">
            Belum ada notifikasi.
          </div>
        ) : (
          homeNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-3xl flex items-center justify-center ${
                  notif.type === "success" ? "bg-emerald-100 text-emerald-700" : notif.type === "warning" ? "bg-amber-100 text-amber-700" : notif.type === "alert" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                }`}>
                  <Bell size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/resident/notifications/${notif.id}`} className="text-sm font-semibold text-zinc-900 hover:text-amber-600 transition">
                        {notif.title}
                      </Link>
                      <p className="text-[11px] text-zinc-400 mt-1">{notif.time}</p>
                    </div>
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 hover:bg-zinc-100 transition"
                      aria-label={`Hapus notifikasi ${notif.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-zinc-600">{notif.message}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="px-4 mt-5">
        <Link to="/resident" className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
