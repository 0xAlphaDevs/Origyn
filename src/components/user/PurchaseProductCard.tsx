"use client"

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { Badge } from "../ui/badge";
import { products } from "@/lib/dummyData";
import Image from "next/image";

interface PurchaseProductCard {

}

const PurchaseProductCard = ({ courseNftAddress }: any) => {
  const router = useRouter();
  const { address } = useAccount();
  const [course, setCourse] = React.useState<PurchaseProductCard>({

  });

  // const {
  //   data: readContractsData,
  //   isLoading: readContractsLoading,
  //   error: readContractsError,
  // } = useReadContracts({
  //   contracts: [
  //     {
  //       address: ,
  //       abi: ,
  //       functionName: "",
  //       args: [addrss],
  //     },
  //   ],
  // });

  // useMemo(() => {
  //   if (!readContractsLoading && readContractsData) {
  //     const [] =
  //       readContractsData.map((result) => result.result);

  //     setProduct({

  //     });
  //   }
  // }, [readContractsData, readContractsLoading]);

  const handleDownload = () => {

  };

  // if (readContractsLoading) {
  //   return (
  //     <>
  //     </>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">
      {products.map((product) => (
        <div key={product.id}
          className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          <Image
            src="/sample2.jpg"
            width={400}
            height={400}
            alt="NFT Collection"
            className="w-full h-32 object-cover"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary">
                {product.name}
              </h3>
              <div className="flex gap-2">
                <p>Product_ID : </p>
                <Badge>{product.id}</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {product.description}
              </p>
              <Button onClick={() => handleDownload()} className="bg-green-600 hover:bg-green-400">
                Download Files
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default PurchaseProductCard;