"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface SlideOverProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  width?: "sm" | "md" | "lg"
}

export default function SlideOver({ open, onClose, title, subtitle, children, width = "md" }: SlideOverProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const widthClass = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" }[width]

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 ${widthClass} w-full bg-surface shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground text-base">{title}</h2>
            {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-muted transition-colors mt-0.5">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Composants de formulaire réutilisables
// ─────────────────────────────────────────────────────────────────────────────
export function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted uppercase tracking-wider">
        {label}{required && <span className="text-alert ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ateliers placeholder:text-slate-300 ${props.className ?? ""}`}
    />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ateliers placeholder:text-slate-300 resize-none ${props.className ?? ""}`}
    />
  )
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ateliers ${props.className ?? ""}`}
    />
  )
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}

export function SaveButton({ onClick, label = "Enregistrer" }: { onClick?: () => void; label?: string }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors mt-2"
    >
      {label}
    </button>
  )
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-alert/30 text-alert py-2 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
    >
      Supprimer
    </button>
  )
}
