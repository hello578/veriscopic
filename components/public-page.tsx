// components/public-page.tsx
// components/public-page.tsx
// components/public-page.tsx

import { ReactNode } from "react"

type PublicPageProps = {
  children: ReactNode
  variant?: "default" | "soft"
}

export function PublicPage({ children, variant = "default" }: PublicPageProps) {
  const bg = variant === "soft" ? "bg-slate-50" : "bg-white"

  return (
    <div className={`min-h-[60vh] ${bg} text-slate-900`}>
      {/* no extra px here – just vertical space if desired */}
      <div className="pt-0 pb-0">{children}</div>
    </div>
  )
}

