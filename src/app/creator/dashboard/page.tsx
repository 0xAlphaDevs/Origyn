import AddNewProduct from "@/components/creator/AddNewProduct";
import ProductCard from "@/components/creator/Productcard";
import React from "react";

const CreatorDashboard = () => {
  return (
    <div className="py-8">
      <div className="flex justify-between pb-12">
        <p className="text-3xl font-medium">Creator Dashboard</p>
        <AddNewProduct />
      </div>
      <ProductCard />
    </div>
  );
};

export default CreatorDashboard;

// app/page.tsx
// import FileHandler from "./components/FileHandler";

// export default function CreatorDashboard() {
//   return (
//     <main>
//       <h1>Encrypt/Decrypt and Upload/Download IPFS File</h1>
//       <FileHandler />
//     </main>
//   );
// }
