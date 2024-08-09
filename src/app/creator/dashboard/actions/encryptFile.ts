"use server";

import { createCipheriv, randomBytes } from "crypto";

export async function encryptFile(fileBuffer: Buffer, filename: string) {
  // Get the encryption key from environment variable
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (!encryptionKey) {
    throw new Error("Encryption key not found in environment variables");
  }

  try {
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
    };
  } catch (error) {
    console.error("Encryption and upload failed:", error);
    throw error;
  }
}

async function uploadToIPFS(data: Object) {
  // Use thirdweb's SDK to upload to IPFS
  // Return the IPFS hash or other relevant information
  return { cid: "QmXyZ", status: true };
}
