"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import { CheckCircleIcon, CircleCheck, CrossIcon, X } from "lucide-react";
import Spinner from "../spinner";
import { encryptFile } from "@/app/creator/dashboard/actions/encryptFile";

const AddNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [fileContents, setFileContents] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  const [isFileContentsDragging, setIsFileContentsDragging] = useState(false);
  const [isDisplayImageDragging, setIsDisplayImageDragging] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState("Uploading display image...");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!displayImage || !fileContents) {
      alert("Please add a display image and file contents");
      return;
    }
    setIsPending(true);
    try {
      const newProduct = {
        id: Date.now(),
        productName,
        productDescription,
        productPrice,
        fileContents: fileContents ? fileContents.name : null,
        displayImage: displayImage ? displayImage.name : null,
      };

      setFormData(newProduct);
      console.log("New product :", newProduct);

      // 1. Upload the display image to IPFS
      const displayImageCID = await uploadDisplayImage();
      console.log("Display Image CID:", displayImageCID);
      // 2. Upload the file contents using encrypt File server
      const fileContentsCID = await encryptAndUploadFileContents();
      console.log("File Contents CID:", fileContentsCID);
      // 3. Attest the product details on-chain
      // 4. Index the product details in database

      // Simulating the above steps
      // setCurrentStep("Uploading display image...");
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // setCurrentStep("Uploading file contents...");
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // setCurrentStep("Creating on-chain attestation...");
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // setCurrentStep("Indexing product details...");
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // setIsSuccess(true);
    } catch (error) {
      alert("An error occurred while adding the product.");
    }
    // finally {
    //   setIsPending(false);
    // }
  };

  // Step 1: Upload the display image to IPFS
  const uploadDisplayImage = async () => {
    try {
      setCurrentStep("Uploading display image...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TO DO : Use thirdweb's SDK to upload Display Image to IPFS
      const result = {
        status: true,
        cid: "display_image_cid",
        message: "success",
      };

      if (result.status) {
        // add completed step
        setCompletedSteps((prevSteps) => [
          ...prevSteps,
          "Display image uploaded",
        ]);
        return result.cid;
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during display image upload");
    }
  };
  // Step 2: Encrypt the file contents and upload to IPFS
  const encryptAndUploadFileContents = async () => {
    try {
      setCurrentStep("Encrypting file contents & uploading...");
      // Convert file to base64
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileContents as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      // Remove the data URL prefix
      const base64Content = fileBase64.split(",")[1];

      // use server action encryptFile
      const result = await encryptFile(
        base64Content,
        fileContents ? fileContents.name : "file_contents"
      );

      if (result.status) {
        setCompletedSteps((prevSteps) => [
          ...prevSteps,
          "File contents encrypted & uploaded",
        ]);
        return result.cid;
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during encryption step");
    }
  };

  const handleDragFileContents = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setIsFileContentsDragging(true);
      } else if (e.type === "dragleave") {
        setIsFileContentsDragging(false);
      }
    },
    []
  );

  const handleDragDisplayImage = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setIsDisplayImageDragging(true);
      } else if (e.type === "dragleave") {
        setIsDisplayImageDragging(false);
      }
    },
    []
  );

  const handleDisplayImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDisplayImageDragging(false);
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
      setIsFileContentsDragging(false);
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
    setError("");
  };

  useEffect(() => {
    console.log(completedSteps);
  }, [completedSteps]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={resetForm}>+ Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isPending ? (
          <div className="flex flex-col justify-center items-center h-96">
            <Spinner />
            <div className="font-bold text-lg text-muted-foreground mt-4">
              {currentStep}
              {completedSteps.length > 0 && (
                <div className="flex flex-col mt-2 text-left px-10 ">
                  {completedSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                      <CircleCheck className="text-green-400 h-6 w-6" />
                      <p className="text-sm font-semibold text-muted-foreground">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : isSuccess || error ? (
          <>
            {isSuccess && (
              <div className="flex flex-col justify-center gap-4 items-center text-green-500 h-96">
                <CheckCircleIcon className="h-12 w-12" />
                <p className="font-semibold text-lg">
                  Product Added Successfully
                </p>
                <Button onClick={resetForm} className="absolute bottom-8">
                  Add Another Product
                </Button>
              </div>
            )}
            {error && (
              <div className="flex flex-col justify-center gap-4 items-center text-red-500 h-96">
                <X className="h-12 w-12" />
                <p className="font-semibold text-center text-lg">
                  There was an error : {error}
                </p>
                <Button onClick={resetForm} className="absolute bottom-8">
                  Try Again
                </Button>
              </div>
            )}
          </>
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
                      isDisplayImageDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDragDisplayImage}
                    onDragLeave={handleDragDisplayImage}
                    onDragOver={handleDragDisplayImage}
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
                      isFileContentsDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDragFileContents}
                    onDragLeave={handleDragFileContents}
                    onDragOver={handleDragFileContents}
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
