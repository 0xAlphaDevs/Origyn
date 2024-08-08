import { Input } from '@/components/ui/input'
import MarketplaceProductCard from '@/components/user/MarketplaceProductCard'
import React from 'react'

const Marketplace = () => {
  return (
    <div className='py-8'>
      <div className="flex justify-between pb-12">
        <p className="text-3xl font-medium">Products</p>
        <Input placeholder='Search products ...' className='w-72' />
      </div>
      <MarketplaceProductCard />
    </div>
  )
}

export default Marketplace