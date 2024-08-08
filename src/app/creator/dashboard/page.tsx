import AddNewProduct from '@/components/creator/AddNewProduct'
import ProductCard from '@/components/creator/Productcard'
import React from 'react'

const CreatorDashboard = () => {
  return (
    <div className='py-8'>
      <div className="flex justify-between pb-12">
        <p className="text-3xl font-medium">Creator Dashboard</p>
        <AddNewProduct />
      </div>
      <ProductCard />
    </div>
  )
}

export default CreatorDashboard