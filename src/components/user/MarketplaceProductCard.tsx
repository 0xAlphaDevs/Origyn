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

interface MarketplaceProductCard {

}

const MarketplaceProductCard = ({ courseNftAddress }: any) => {
  const router = useRouter();
  const { address } = useAccount();
  const [course, setCourse] = React.useState<MarketplaceProductCard>({

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

  //     setItem({

  //     });
  //   }
  // }, [readContractsData, readContractsLoading]);

  const handleViewProduct = (id: string) => {
    router.push(`/marketplace/product/${id}`);
  };

  // if (readContractsLoading) {
  //   return (
  //     <>
  //     </>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
      {products.map((product) => (
        <div key={product.id}
          className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          <Image
            src="/sample.jpg"
            width={400}
            height={400}
            alt="NFT Collection"
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary">
                {product.name}
              </h3>
              <Badge>{product.id}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            <Button onClick={() => handleViewProduct(product.id)}>
              View Product
            </Button>
          </div>
        </div>
        // <div key={product.nftAddress} className="relative shadow-lg border">
        //   <Image src={product.src} width={150} height={150} alt="Logo" className="opacity-75 w-full rounded-lg" />
        //   <Card className="shadow-md absolute bottom-8 left-0 right-0 transform translate-y-1/2">
        //     <CardHeader>
        //       <CardTitle className="flex justify-between items-center">
        //         <span>{product.name}</span>
        //         <div className="flex gap-2 items-center">
        //           <Badge>{product.id}</Badge>
        //         </div>
        //       </CardTitle>
        //       <CardDescription>
        //         {product.description}
        //       </CardDescription>
        //     </CardHeader>
        //     <CardContent className="flex flex-col gap-2">
        //       <p className="text-muted-foreground">
        //         Price:{" "}
        //         <strong className="text-lg font-bold">
        //           {product.price}
        //         </strong>
        //       </p>
        //       <Button onClick={() => handleViewProduct(product.id)}>
        //         View Product
        //       </Button>
        //     </CardContent>
        //   </Card>
        // </div>
      ))}
    </div>

  );
};

export default MarketplaceProductCard;