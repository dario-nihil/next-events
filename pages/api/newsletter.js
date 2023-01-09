import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    try {
      await insertDocument(client, "newsletter", { email });
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Inserting data failed!" });
    }

    return res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
