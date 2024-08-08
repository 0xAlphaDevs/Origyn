import { Input } from '@/components/ui/input'
import MarketplaceProductCard from '@/components/user/MarketplaceProductCard'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Marketplace = () => {
  return (
    <div className='py-8'>
      <div className="flex justify-between pb-12">
        <p className="text-3xl font-medium">Products</p>
        <div className='relative'>
          <SearchIcon className='text-muted-foreground h-6 w-4 absolute top-2 left-2' />
          <Input placeholder='     Search products ...' className='w-72' />
        </div>
      </div>
      <MarketplaceProductCard />
    </div>
  )
}

export default Marketplace