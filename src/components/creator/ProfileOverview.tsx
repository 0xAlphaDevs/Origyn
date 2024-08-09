import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EarningChart } from "./EarningChart";
import { useReadContracts } from "wagmi";

const ProfileOverview = () =>
  // { allProducts }: { allProducts: string[] }
  {
    // const products: string[] = allProducts;
    const [totalSales, setTotalSales] = React.useState(0);
    const [productEarnings, setProductEarnings] = React.useState([
      { courseId: "00000", earnings: 0 },
    ]);
    const [totalEarnings, setTotalEarnings] = React.useState(0);

    // const earningsContractCalls = products.map((course: string) => ({
    //   address: ,
    //   abi: ,
    //   functionName: "",
    // }));

    // const totalSalesContractCalls = products.map((course: string) => ({
    //   address:,
    //   abi: ,
    //   functionName: "",
    // }));

    // const productsymbolContractCalls = products.map((course: string) => ({
    //   address: ,
    //   abi: ,
    //   functionName: "",
    // }));

    // const {
    //   data: earningsData,
    //   error: readEarningsError,
    //   isLoading: readEarningsLoading,
    // } = useReadContracts({

    //   contracts: ,
    // });

    // useMemo(() => {
    //   // console.log("earnings data :", earningsData);

    //   if (
    //     !readEarningsLoading &&
    //     earningsData &&
    //     !readproductsymbolLoading &&
    //     productsymbolData
    //   ) {
    //     // sum all the earnings
    //     const totalEarnings = earningsData.reduce((acc, contract) => {
    //       return acc + Number(contract.result) / 10 ** 18;
    //     }, 0);

    //     const productEarnings = earningsData.map((contract, index) => {
    //       return {
    //         courseId: productsymbolData[index].result as string,
    //         earnings: Number(contract.result) / 10 ** 18,
    //       };
    //     });

    //     // console.log("course earnings :", productEarnings);

    //     setProductEarnings(productEarnings);

    //     setTotalEarnings(totalEarnings);
    //   }
    // }, [
    //   earningsData,
    //   readEarningsLoading,
    //   productsymbolData,
    //   readproductsymbolLoading,
    // ]);

    // useMemo(() => {
    //   if (!readTotalSalesLoading && totalSalesData) {
    //     // sum all the total sales
    //     const totalSales = totalSalesData.reduce((acc, contract) => {
    //       return acc + Number(contract.result);
    //     }, 0);

    //     console.log("total sales :", totalSales);

    //     setTotalSales(totalSales - 1);
    //   }
    // }, [totalSalesData, readTotalSalesLoading]);

    return (
      <div className="flex gap-8 w-full my-8">
        <Card className="w-[50%] ">
          <CardHeader>
            <CardTitle className="">Profile Overview</CardTitle>
            <CardDescription>
              Below are the details of your total earnings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="text-lg">Total products : </p>
              <p className="font-bold text-lg">
                12
                {/* {products.length} */}
              </p>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <p>Total Sales : </p>
              <p className="font-bold">{totalSales}</p>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <p>Total Revenue : </p>
              <p className="font-bold"> {totalEarnings} USD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[50%] ">
          <CardHeader>
            <CardTitle>Product Wise Earnings</CardTitle>
            <CardDescription>
              Below are the details of your course wise earnings
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <EarningChart productEarnings={productEarnings} />
          </CardContent>
        </Card>
      </div>
    );
  };

export default ProfileOverview;
