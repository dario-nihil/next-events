import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://dario:BNFJu2qjdTQXsTv4@cluster0.ovnq1fr.mongodb.net/events?retryWrites=true&w=majority"
  );
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
  client,
  collection,
  sort,
  filter = {}
) => {
  const db = client.db();

  return await db.collection(collection).find(filter).sort(sort).toArray();
};
