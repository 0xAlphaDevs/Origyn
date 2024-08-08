import { Input } from '@/components/ui/input'
import PurchaseProductCard from '@/components/user/PurchaseProductCard'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const MyPurchases = () => {
  return (
    <div className='py-8'>
      <div className='flex justify-between pb-10'>
        <p className="text-3xl font-medium">My Purchases</p>
        <div className='relative'>
          <SearchIcon className='text-muted-foreground h-6 w-4 absolute top-2 left-2' />
          <Input placeholder='     Search products ...' className='w-72' />
        </div>
      </div>
      <PurchaseProductCard />
    </div>
  )
}

export default MyPurchases