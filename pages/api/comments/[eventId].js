import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://dario:BNFJu2qjdTQXsTv4@cluster0.ovnq1fr.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return res.status(200).json({ comments: documents });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newComment = {
      email,
      name,
      text,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    console.log(result);
    return res
      .status(201)
      .json({ message: "Added comment.", comment: newComment });
  }

  client.close();
};

export default handler;
