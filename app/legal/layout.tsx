// app/legal/layout.tsx

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white text-slate-900">
      {/* RootLayout already applied header + main pt/pb */}
      <div className="mx-auto max-w-3xl px-6">{children}</div>
    </div>
  )
}
