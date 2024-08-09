import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { Skeleton } from "../ui/skeleton";

interface Product {

}

const EarningsProductCard = ({ ProductId }: any) => {
  const { address } = useAccount();
  const [product, setProduct] = React.useState<Product>({

  });
  const { error, isPending, isSuccess, writeContract } = useWriteContract();

  // const {
  //   data: contractsData,
  //   error: readContractsError,
  //   isLoading: readContractsLoading,
  // } = useReadContracts({
  //   contracts: [
  //     {
  //       address: ,
  //       abi: ,
  //       functionName: "",
  //     },
  //   ],
  // });

  // useMemo(() => {
  //   if (!readContractsLoading && contractsData) {
  //     const [name, description, symbol, ProductEarnings] = contractsData.map(
  //       (result) => result.result
  //     );
  //     setProduct({

  //     });
  //   }
  // }, [contractsData, readContractsLoading]);

  const handleWithdrawEarnings = () => {
    // writeContract({
    //   address: ,
    //   abi: ,
    //   functionName: "",
    //   account: ,
    // });
  };

  // if (readContractsLoading) {
  //   return (
  //     <Card key={ProductId} className="shadow-md">
  //       <CardContent className="flex justify-between items-center pt-4">
  //         <div className="flex flex-col gap-4">
  //           <Skeleton className="w-36 h-4 rounded-lg " />
  //           <Skeleton className="w-56 h-4 rounded-lg" />
  //           <CardDescription className="flex gap-40">
  //             <Skeleton className="h-4 w-24 rounded-lg" />
  //             <Skeleton className="h-4 w-24 rounded-lg" />
  //           </CardDescription>
  //         </div>
  //         <Skeleton className="h-10 w-32 rounded-lg" />
  //       </CardContent>
  //     </Card>
  //   );
  // }

  return (
    <Card className="shadow-md">
      <CardContent className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2">
          <CardTitle>Product Name</CardTitle>
          <CardDescription>
            Product Description : This is a test description
          </CardDescription>
          <CardDescription className="flex gap-40">
            <p>
              Product code : <strong className="text-lg">zxcv</strong>
            </p>
            <p>
              Product earnings :{" "}
              <strong className="text-lg">100</strong>
            </p>
          </CardDescription>
        </div>
        <Button onClick={handleWithdrawEarnings} disabled={isPending}>
          {isPending && !isSuccess ? "Txn in process..." : "Withdraw Earnings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EarningsProductCard;