"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useMemo } from "react";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useBalance,
} from "wagmi";

const UserWallet = () => {
  const { address } = useAccount();
  const [accountBalance, setAccountBalance] = React.useState<number>(0);
  // TO DO : Remove this later
  const [isLoading, setIsLoading] = React.useState(false);
  const { error, isPending, writeContract } = useWriteContract();

  // const { data: balance, isLoading } = useReadContract({
  //   address: ,
  //   abi: ,
  //   functionName: "",
  //   args: [address],
  // });

  const { data } = useBalance({ address: address });

  // useMemo(() => {
  //   if (balance) {
  //     const accountBalance = Number(balance) / 10 ** 18;
  //     setAccountBalance(accountBalance);
  //   }
  // }, [balance]);

  const handleMint = () => {
    // writeContract({
    //   address: ,
    //   abi: ,
    //   functionName: "mint",
    //   args: [address, 100 * 10 ** 18],
    // });
  };

  return (
    <div className="flex flex-col gap-10 p-16">
      <div className="flex flex-col gap-4 justify-center items-center ">
        <div className="text-4xl font-semibold">Your Holdings</div>
        {/* <div className="border border-solid border-slate-800 w-full" /> */}
      </div>
      <div className="flex justify-around">
        <Card className="flex flex-col gap-4 p-4 shadow-md w-96">
          <CardDescription> Current balance </CardDescription>
          {isLoading ? (
            <Skeleton className="h-8 w-28 rounded-lg" />
          ) : (
            <CardTitle> {accountBalance} </CardTitle>
          )}

          <CardDescription> ETH Balance </CardDescription>
          {!data ? (
            <Skeleton className="h-8 w-28 rounded-lg" />
          ) : (
            <CardTitle> {data.formatted} ETH</CardTitle>
          )}
        </Card>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <Skeleton className="h-12 w-28 rounded-lg" />
        ) : isPending ? (
          <Button className="text-lg" disabled>
            Minting in progress...
          </Button>
        ) : (
          <Button onClick={handleMint} className="text-lg">
            Mint 100
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserWallet;