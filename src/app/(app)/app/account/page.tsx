import H1 from '@/components/h1'
import React from 'react'

export default function AccountPage() {
  return (
   <main>
    <H1 className='my-8 text-white'>Your Account</H1>
    
    <div className="block-container min-h-[500px] flex justify-center items-center">
      <p>Logged in as ...</p>
    </div>
   </main>
  )
}
