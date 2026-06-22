import { useParams, Link } from "react-router-dom"
import { facilityBookings } from "../../data/dummy"
import { Badge } from "../../components/ui/badge"
import { ChevronRight } from "lucide-react"

export function BookingDetailPage() {
  const { id } = useParams()
  const booking = facilityBookings.find(b => b.id === id)

  if (!booking) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-bold">Booking tidak ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-2">Periksa kembali ID booking atau kembali ke daftar.</p>
        <Link to="/resident/booking" className="mt-4 inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Booking <ChevronRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">{booking.facility}</h2>
          <div className="text-sm text-zinc-500">{booking.date} · {booking.time}</div>
        </div>
        <Badge variant={booking.status === "confirmed" ? "success" : "warning"}>{booking.status === "confirmed" ? "Konfirmasi" : "Pending"}</Badge>
      </div>

      <div className="mt-4 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="text-sm text-zinc-700">Pemesan</div>
        <div className="text-sm font-semibold text-zinc-900">{booking.resident}</div>
        {booking.location && <div className="text-[13px] text-zinc-500 mt-2">Lokasi: {booking.location}</div>}
        {typeof booking.attendees !== "undefined" && <div className="text-[13px] text-zinc-500">Peserta: {booking.attendees}</div>}
        {booking.bookedAt && <div className="text-[13px] text-zinc-500">Dipesan: {booking.bookedAt}</div>}
        {booking.reference && <div className="text-[13px] text-zinc-500">Ref: {booking.reference}</div>}
        {booking.notes && <div className="mt-2 text-sm italic text-zinc-500">Catatan: {booking.notes}</div>}
      </div>

      <div className="mt-6">
        <Link to="/resident/booking" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
          Kembali ke Booking <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default BookingDetailPage
