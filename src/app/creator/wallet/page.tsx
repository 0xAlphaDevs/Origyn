"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useMemo } from "react";
import { useReadContract, useAccount, useBalance } from "wagmi";

const CreatorWallet = () => {
  const { address } = useAccount();
  const [accountBalance, setPhtBalance] = React.useState<number>(0);

  // const { data: balance } = useReadContract({
  //   address: ,
  //   abi: ,
  //   functionName: "",
  //   args: [address],
  // });

  const { data } = useBalance({ address: address });

  // useMemo(() => {
  //   if (balance) {
  //     const accountBalance = Number(balance) / 10 ** 18;
  //     setPhtBalance(accountBalance);
  //   }
  // }, [balance]);

  return (
    <div className="flex flex-col gap-10 p-16">
      <div className="flex flex-col gap-4 justify-center items-center ">
        <div className="text-4xl font-semibold">Your Holdings</div>
        {/* <div className="border border-solid border-slate-800 w-full" /> */}
      </div>
      <div className="flex justify-around">
        <Card className="flex flex-col gap-4 p-4 shadow-md w-96">
          <CardDescription> Current balance </CardDescription>
          {!accountBalance ? (
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
    </div>
  );
};

export default CreatorWallet;