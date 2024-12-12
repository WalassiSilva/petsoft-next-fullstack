import BrandingSection from '@/components/branding-section'
import StatsSection from '@/components/stats-section'
import React from 'react'

export default function DashboardPage() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <BrandingSection />
        <StatsSection />
      </div>
    </main>
  )
}
