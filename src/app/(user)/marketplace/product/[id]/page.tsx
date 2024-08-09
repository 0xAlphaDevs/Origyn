"use client"

import React from 'react';
import { useRouter, useParams } from "next/navigation";
import { CrossIcon, MoveLeftIcon, OctagonAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/dummyData';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ViewProductAttestation from '@/components/user/ViewProductAttestation';

const Productview = () => {
  const router = useRouter();
  const { id } = useParams();

  const product = products.find(product => product.id === id);

  const handleBackClick = () => {
    router.back();
  };

  if (!product) {
    return (
      <div className='py-8'>
        <div className='flex justify-between'>
          <div className="h-6 w-6 cursor-pointer mr-2" onClick={handleBackClick}>
            <MoveLeftIcon className="h-6 w-6" />
          </div>
          <div className='text-3xl font-medium'>
            Product Overview
          </div>
          <div></div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center mt-40'>
          <OctagonAlertIcon className='h-12 w-12 text-red-500' />
          <p className='text-red-500 text-center text-2xl font-bold'>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <div className='flex justify-between items-center mb-20'>
        <div className="cursor-pointer mr-2" onClick={handleBackClick}>
          <MoveLeftIcon className="h-6 w-6" />
        </div>
        <div className='text-3xl font-semibold'>
          Product Overview
        </div>
        <div></div>
      </div>

      <div className='flex justify-between items-center mb-8'>
        <div className="text-2xl md:text-6xl font-bold ">{product.name}</div>
        <div className='flex gap-4 flex-col'>
          <div className='flex gap-2 '>
            <p className='font-medium text-md'>Product_ID : </p>
            <Badge >{product.id}</Badge>
          </div>
          <div className='flex gap-2 items-center'>
            <p className='font-medium text-md'>Product Price : </p>
            <p className='font-semibold text-lg'> {product.price} USD</p>
          </div>
        </div>
      </div>

      <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <Image
          src={product.src}
          width={400}
          height={400}
          alt="NFT Collection"
          className="w-full h-44 object-cover transition-transform"
          style={{ aspectRatio: "400/400", objectFit: "cover" }}
        />
        <div className="p-4 flex justify-center">
          <p className="text-md text-muted-foreground">
            {product.description}
          </p>
        </div>
      </div>

      <div className='flex justify-center gap-4 items-center py-10'>
        <Button className='font-bold text-xl'>Purchase Product</Button>
        <ViewProductAttestation />
      </div>
    </div>
  )
}

export default Productview;
