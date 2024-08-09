"use client";

import EarningsProductCard from '@/components/creator/EarningsProductCard';
import ProfileOverview from '@/components/creator/ProfileOverview'
import { Skeleton } from '@/components/ui/skeleton';
import { products } from '@/lib/dummyData';
import React, { useState } from 'react'


const Earnings = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="py-8">
      <p className="text-3xl font-medium"> Earnings</p>
      <ProfileOverview />
      <div>
        <p className="text-xl font-medium"> Course wise breakup </p>
        <div className="flex flex-col gap-4 my-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
              <Skeleton className="rounded-lg shadow-md bg-white h-28" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center text-lg font-bold mt-4 text-muted-foreground">
              You have not created any product yet.
            </div>
          ) : (
            products.map((id) => (
              <EarningsProductCard key={id} ProductId={id} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Earnings