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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <Card key={product.nftAddress} className="shadow-md">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <p>{product.name}</p>
              <div className="flex gap-2 items-center">
                <div className="text-sm">Product ID :</div>
                <Badge>{product.id}</Badge>
              </div>
            </CardTitle>
            <CardDescription>
              <p>{product.description}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Price:{" "}
              <strong className="text-lg font-bold">
                {product.price}
              </strong>
            </p>
            <Button onClick={() => handleViewProduct(product.id)}>
              View Product
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

  );
};

export default MarketplaceProductCard;