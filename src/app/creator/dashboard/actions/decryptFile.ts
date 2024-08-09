// app/actions/decryptFile.ts
"use server";

import crypto from "crypto";

export async function decryptFile(
  cid: string,
  walletAddress: string,
  signature: string
) {
  // Get the encryption key from environment variable
  const encryptionKey = process.env.ENCRYPTION_KEY;

  // check if signature is valid using viem

  // check if the wallet has access to the file, call a fuction on origyn contract : checkAccess(walletAddress, cid)

  if (!encryptionKey) {
    throw new Error("Encryption key not found in environment variables");
  }

  try {
    // Download the encrypted file from IPFS
    const encryptedData = await downloadFromIPFS(cid);

    // Convert the encryption key to a buffer
    const keyBuffer = Buffer.from(encryptionKey, "hex");

    // Extract the IV from the encrypted data
    const iv = Buffer.from(encryptedData.iv, "hex");

    // Create a decipher using AES-256-CBC
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

    // Decrypt the data
    let decrypted = decipher.update(Buffer.from(encryptedData.content, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Convert the decrypted data to a base64 string
    const decryptedBase64 = decrypted.toString("base64");

    return {
      success: true,
      data: decryptedBase64,
      filename: encryptedData.filename,
    };
  } catch (error) {
    console.error("Decryption error:", error);
    return {
      success: false,
      error: "Failed to decrypt the file",
    };
  }
}

async function downloadFromIPFS(cid: string) {
  // Use thirdweb's SDK to download from IPFS
  // Return the encrypted data
  return {
    content: "QmXyZ", // This would be returned by thirdweb's download function
    iv: "1234567890abcdef",
    filename: "encrypted-file.txt",
  };
}
