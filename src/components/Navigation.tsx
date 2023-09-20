"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname()
    const homepage = pathname === '/'


    const handleGoBack = () => {
        
        router.back();
      }
  return (
    <div className="bg-blue-500 p-4">
    <div className="flex justify-between space-x-4">
    <div className="text-white">
   {!homepage && (
     <button type="button" onClick={() => router.back()} disabled={pathname === '/'}>
     Go Back
 </button>
   )}
        </div>
      <div className="text-white">
        <Link href="/">
          Recipe Homepage
        </Link>
      </div>
      
      <div className="text-white">
      <button type="button" onClick={handleGoBack}>
        Go Forward
      </button>
        </div>

      
    </div>
  </div>
  )
}

export default Navigation