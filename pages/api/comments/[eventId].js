import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connecting to the database failed!" });
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      return res.status(500).json({ message: "Getting comments failed!" });
    } finally {
      client.close();
    }
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
      client.close();
      return res.status(422).json({ message: "Invalid input." });
    }

    const newComment = {
      email,
      name,
      text,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (error) {
      return res.status(500).json({ message: "Inserting comment failed!" });
    } finally {
      client.close();
    }

    newComment_id = result.insertedId;

    console.log(result);
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  client.close();
};

export default handler;
