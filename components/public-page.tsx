// components/public-page.tsx


export function PublicPage({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "soft"
}) {
  return (
    <main
      className={`pt-[96px] ${
        variant === "soft" ? "bg-slate-50" : "bg-white"
      }`}
    >
      {children}
    </main>
  )
}
