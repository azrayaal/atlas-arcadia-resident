import { useParams, Link } from "react-router-dom"
import { rewards } from "../../data/dummy"
import { Star, ChevronRight } from "lucide-react"

export function RewardDetailPage() {
  const { id } = useParams()
  const rid = Number(id)
  const reward = rewards.find(r => r.id === rid)

  if (!reward) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-bold">Reward tidak ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-2">Periksa kembali ID reward atau kembali ke daftar.</p>
        <Link to="/resident/rewards" className="mt-4 inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Rewards <ChevronRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-zinc-500">Kategori</div>
          <h2 className="text-xl font-bold text-zinc-900">{reward.name}</h2>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Star size={16} className="text-amber-500" />
            <div className="text-lg font-bold">{reward.points}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="text-sm text-zinc-700">Ketersediaan</div>
        <div className={`mt-1 text-sm font-semibold ${reward.available ? "text-emerald-600" : "text-amber-600"}`}>{reward.available ? "Tersedia" : "Tidak tersedia"}</div>
        {reward.description && <div className="mt-3 text-sm text-zinc-600">{reward.description}</div>}
      </div>

      <div className="mt-6">
        <Link to="/resident/rewards" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Rewards <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default RewardDetailPage
