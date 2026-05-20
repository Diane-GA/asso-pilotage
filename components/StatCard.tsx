import { type LucideIcon } from "lucide-react"
import Link from "next/link"

interface StatCardProps {
  title: string
  icon: LucideIcon
  accentClass: string
  iconClass: string
  borderClass: string
  stats: { label: string; value: string | number; highlight?: boolean }[]
  alerts?: number
  href: string
  cta: string
}

export default function StatCard({
  title,
  icon: Icon,
  accentClass,
  iconClass,
  borderClass,
  stats,
  alerts = 0,
  href,
  cta,
}: StatCardProps) {
  return (
    <div className={`bg-surface rounded-xl border-l-4 ${borderClass} shadow-sm p-5 flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`p-2 rounded-lg ${accentClass}`}>
            <Icon size={18} className={iconClass} />
          </span>
          <h2 className="font-semibold text-foreground text-sm">{title}</h2>
        </div>
        {alerts > 0 && (
          <span className="bg-alert text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {alerts}
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {stats.map(({ label, value, highlight }) => (
          <li key={label} className="flex justify-between items-center text-sm">
            <span className="text-muted">{label}</span>
            <span className={`font-semibold ${highlight ? "text-alert" : "text-foreground"}`}>
              {value}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-auto text-center text-sm font-medium py-2 rounded-lg ${accentClass} ${iconClass} hover:opacity-80 transition-opacity`}
      >
        {cta} →
      </Link>
    </div>
  )
}
