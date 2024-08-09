"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon } from "lucide-react";
import Spinner from "../spinner";

const AddNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [fileContents, setFileContents] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState("Uploading display image...");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      // Simulating an async operation
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const newProduct = {
        id: Date.now(),
        productName,
        productDescription,
        productPrice,
        fileContents: fileContents ? fileContents.name : null,
        displayImage: displayImage ? displayImage.name : null,
      };
      setFormData(newProduct);
      console.log("New product added:", newProduct);

      // 1. Upload the display image to the server
      // 2. Upload the file contents using encrypt File server action
      // 3. Attest the product details on-chain
      // 4. Index the product details in database

      // Simulating the above steps
      setCurrentStep("Uploading display image...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentStep("Uploading file contents...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentStep("Creating on-chain attestation...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentStep("Indexing product details...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSuccess(true);
    } catch (error) {
      alert("An error occurred while adding the product.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDisplayImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setDisplayImage(e.dataTransfer.files[0]);
      }
    },
    []
  );

  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDisplayImage(e.target.files[0]);
    }
  };

  const handleFileContentsDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFileContents(e.dataTransfer.files[0]);
      }
    },
    []
  );

  const handleFileContentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileContents(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setDisplayImage(null);
    setFileContents(null);
    setIsSuccess(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={resetForm}>+ Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isPending ? (
          <div className="flex flex-col justify-center items-center h-96">
            <Spinner />
            <p className="font-bold text-lg text-muted-foreground mt-4">
              {currentStep}
            </p>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col justify-center gap-4 items-center text-green-500 h-96">
            <CheckCircleIcon className="h-12 w-12" />
            <p className="font-semibold text-lg">Product Added Successfully</p>
            <Button onClick={resetForm} className="absolute bottom-8">
              Add Another Product
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your portfolio
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productName" className="text-right">
                    Product Name
                  </Label>
                  <Input
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productDescription" className="text-right">
                    Product Description
                  </Label>
                  <Input
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productPrice" className="text-right">
                    Product Price
                  </Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Product Display Image</Label>
                  <div
                    className={`col-span-3 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDisplayImageDrop}
                    onClick={() =>
                      document.getElementById("displayImageInput")?.click()
                    }
                  >
                    <input
                      id="displayImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleDisplayImageChange}
                      style={{ display: "none" }}
                    />
                    {displayImage ? (
                      displayImage?.name
                    ) : (
                      <p className="text-muted-foreground">
                        Select a display image for your product
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">File Contents</Label>
                  <div
                    className={`col-span-3 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleFileContentsDrop}
                    onClick={() =>
                      document.getElementById("fileContentsInput")?.click()
                    }
                  >
                    <input
                      id="fileContentsInput"
                      type="file"
                      accept="*"
                      onChange={handleFileContentsChange}
                      style={{ display: "none" }}
                    />
                    {fileContents ? (
                      fileContents?.name
                    ) : (
                      <p className="text-muted-foreground">
                        Drag and drop your file contents here, or click to
                        select
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-400"
              >
                Add Product
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProduct;
