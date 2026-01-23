// app/(org)/[organisationId]/layout.tsx

// app/(org)/[organisationId]/layout.tsx

import { ReactNode } from 'react'

export default function OrganisationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
