// app/components/FileHandler.tsx
"use client";

import { useState } from "react";
import { decryptFile } from "../actions/decryptFile";
import { encryptFile } from "../actions/encryptFile";

export default function FileHandler() {
  const [cid, setCid] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    // create a signature with test data { Origyn: "verify-me" } and send it to sever action decryptFile

    // TEST CODE
    console.log("CID:", cid);
    setMessage("File decrypted and downloaded successfully");
    setIsLoading(false);

    // try {
    //   const result = await decryptFile(cid, walletAddress, signature);

    //   if (result.success) {
    //     // Create a Blob from the decrypted data
    //     const blob = new Blob([Buffer.from(result.data, "base64")]);

    //     // Create a download link
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.style.display = "none";
    //     a.href = url;
    //     a.download = result.filename;

    //     // Trigger the download
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     setMessage("File decrypted and downloaded successfully");
    //   } else {
    //     setError(result.error);
    //   }
    // } catch (err) {
    //   setError("An error occurred during decryption");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleEncrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError("");
    setMessage("");

    // TEST CODE
    console.log("File:", file);
    setMessage("File encrypted and uploaded successfully");
    setIsLoading(false);

    // try {
    //   const buffer = await file.arrayBuffer();
    //   const result = await encryptFile(Buffer.from(buffer), file.name);

    //   if (result.success) {
    //     setMessage(`File encrypted and uploaded. CID: ${result.cid}`);
    //   } else {
    //     setError(result.error);
    //   }
    // } catch (err) {
    //   setError("An error occurred during encryption");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      <form onSubmit={handleDecrypt}>
        <input
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          placeholder="Enter CID to decrypt"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Decrypting..." : "Decrypt and Download"}
        </button>
      </form>

      <form onSubmit={handleEncrypt}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Encrypting..." : "Encrypt and Upload"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
