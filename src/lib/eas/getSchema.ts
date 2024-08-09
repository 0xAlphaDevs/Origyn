import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { address } from "@/lib/contracts/SchemaRegistry.json";

export const getSchema = async (provider: any, schemaUID: string) => {
  const schemaRegistry = new SchemaRegistry(address);
  schemaRegistry.connect(provider);

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  return schemaRecord;
};

// Example Output
// {
//   uid: '0xYourSchemaUID',
//   schema: 'bytes32 proposalId, bool vote',
//   resolver: '0xResolverAddress',
//   revocable: true
// }
