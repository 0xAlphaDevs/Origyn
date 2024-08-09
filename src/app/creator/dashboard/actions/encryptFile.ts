"use server";

import { createCipheriv, randomBytes } from "crypto";
import { decryptFile } from "./decryptFile";

export async function encryptFile(fileBase64: string, filename: string) {
  console.log("Encrypting file:", filename);
  console.log("File :", fileBase64);

  // Get the encryption key from environment variable
  const encryptionKey = process.env.ENCRYPTION_KEY;

  console.log("Encryption key:", encryptionKey);

  if (!encryptionKey) {
    throw new Error("Encryption key not found in environment variables");
  }

  try {
    // Convert the base64 string back to a buffer
    const fileBuffer = Buffer.from(fileBase64, "base64");

    // Convert the encryption key to a buffer
    const keyBuffer = Buffer.from(encryptionKey, "hex");

    // Generate a random IV
    const iv = randomBytes(16);

    // Create a cipher using AES-256-CBC
    const cipher = createCipheriv("aes-256-cbc", keyBuffer, iv);

    // Encrypt the data
    let encrypted = cipher.update(fileBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Prepare the data to be uploaded to IPFS
    const encryptedData = {
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
      filename: filename,
    };

    // Upload the encrypted data to IPFS
    const { cid, status } = await uploadToIPFS(encryptedData);

    return {
      status: status,
      cid: cid,
      message: "success",
    };
  } catch (error) {
    console.error("Encryption and upload failed:", error);
    return { status: false, message: "Encryption and upload failed" };
  }
}

async function uploadToIPFS(data: {
  iv: string;
  content: string;
  filename: string;
}) {
  // TO DO : Use thirdweb's SDK to upload to IPFS
  console.log("Uploading to IPFS:", data);
  // TESTING : Test decryption as well here
  // await decryptFile(data);
  // Return the IPFS hash or other relevant information
  return { cid: "file_contents_cid", status: true, message: "success" };
}
