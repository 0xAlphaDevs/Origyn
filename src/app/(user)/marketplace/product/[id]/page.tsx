"use client"

import React from 'react';
import { useRouter, useParams } from "next/navigation";
import { MoveLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/dummyData';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

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
        </div>
        <p className='text-red-500 text-center mt-20'>Product not found</p>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <div className='flex justify-between items-center mb-8'>
        <div className="cursor-pointer mr-2" onClick={handleBackClick}>
          <MoveLeftIcon className="h-6 w-6" />
        </div>
        <div className='text-3xl font-semibold'>
          Product Overview
        </div>
        <div></div>
      </div>
      {/* <div>
        <div className='flex justify-between pb-4'>
          <p className='font-bold text-xl'>{product.name}</p>
          <div className='flex gap-2'>
            <p className='font-semibold text-lg'>Product_ID : </p>
            <Badge>{product.id}</Badge>
          </div>
        </div>
        <div className='w-full h-96 relative'>
          <Image
            src={product.src}
            alt={product.name}
            fill
            className='rounded-lg object-cover shadow-sm'
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className='text-muted-foreground text-center py-2'>{product.description}</p>
        <Button>Purchase Product</Button>
      </div> */}
      <section className="w-full py-10 bg-gradient-to-r from-[#9561e8] to-[#e964a7] overflow-hidden">
        <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">{product.name}</h1>
            <p className="text-lg md:text-xl text-white/80">
              {product.description}
            </p>
            <div className='flex gap-2 text-white'>
              <p className='font-semibold text-lg'>Product_ID : </p>
              <Badge className='bg-violet-950'>{product.id}</Badge>
            </div>
            <div className='w-full'>
              <Button className='bg-violet-900 w-full'>Purchase Product</Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Image
              src={product.src}
              width={400}
              height={400}
              alt="Hero NFT"
              className="max-w-full h-auto rounded-lg shadow-lg"
              style={{ aspectRatio: "600/600", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Productview;
