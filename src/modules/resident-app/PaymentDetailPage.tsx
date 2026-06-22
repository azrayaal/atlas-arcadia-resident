import { useParams, Link } from "react-router-dom"
import { residentBills, transactions } from "../../data/dummy"
import { formatCurrency } from "../../lib/utils"
import { ChevronRight } from "lucide-react"

export function PaymentDetailPage() {
  const { id } = useParams()

  const bill = residentBills.find(b => b.id === id)
  const tx = transactions.find(t => t.id === id)

  if (!bill && !tx) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-bold">Data pembayaran tidak ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-2">Periksa kembali ID atau kembali ke riwayat.</p>
        <Link to="/resident/billing" className="mt-4 inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Tagihan <ChevronRight size={14} />
        </Link>
      </div>
    )
  }

  if (bill) {
    return (
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Tagihan {bill.month}</h2>
            <div className="text-sm text-zinc-500">Jatuh tempo: {bill.dueDate}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{formatCurrency(bill.total)}</div>
            <div className="text-sm text-zinc-500">Status: {bill.status}</div>
          </div>
        </div>

        <div className="mt-4 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
          {bill.items.map((it, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="text-sm text-zinc-700">{it.label}</div>
              <div className="text-sm font-semibold text-zinc-900">{formatCurrency(it.amount)}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link to="/resident/billing" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
            Kembali ke Tagihan <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Transaksi {tx?.id}</h2>
      <div className="mt-3 text-sm text-zinc-700">Tanggal: {tx?.date}</div>
      <div className="mt-2 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="text-sm">Pengguna</div>
          <div className="text-sm font-semibold">{tx?.resident} · {tx?.unit}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">Jenis</div>
          <div className="text-sm font-semibold">{tx?.type}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">Jumlah</div>
          <div className="text-sm font-bold">{formatCurrency(tx?.amount ?? 0)}</div>
        </div>
        <div className="mt-3 text-sm text-zinc-500">Status: {tx?.status}</div>
      </div>

      <div className="mt-4">
        <Link to="/resident/billing" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Riwayat Pembayaran <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default PaymentDetailPage
