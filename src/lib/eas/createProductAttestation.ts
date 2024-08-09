import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { address } from "@/lib/contracts/EAS.json";
import { ProductAttestation } from "@/lib/types";

export const createProductAttestation = async (
  signer: any,
  productAttestionData: ProductAttestation,
  recipient: string
) => {
  const eas = new EAS(address);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(
    "string productName, string productDescription, uint256 productPrice, address creator, string contentURI"
  );
  const encodedData = schemaEncoder.encodeData([
    {
      name: "productName",
      value: productAttestionData.productName,
      type: "string",
    },
    {
      name: "productDescription",
      value: productAttestionData.productDescription,
      type: "string",
    },
    {
      name: "productPrice",
      value: productAttestionData.productPrice,
      type: "uint256",
    },
    { name: "creator", value: productAttestionData.creator, type: "address" },
    {
      name: "contentURI",
      value: productAttestionData.contentURI,
      type: "string",
    },
  ]);

  const schemaUID =
    "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: recipient,
      expirationTime: BigInt(0),
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);

  return newAttestationUID;
};
