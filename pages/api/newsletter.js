import { MongoClient, ServerApiVersion } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    //"mongodb+srv://dario:BNFJu2qjdTQXsTv4@cluster0.w6fglbk.mongodb.net/newsletter?retryWrites=true&w=majority"
    const client = await MongoClient.connect(
      "mongodb+srv://dario:BNFJu2qjdTQXsTv4@cluster0.ovnq1fr.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: email });

    client.close();

    return res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
