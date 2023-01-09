const handler = (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment" },
      { id: "c2", name: "Manuel", text: "A second comment" },
    ];

    return res.status(200).json({ comments: dummyList });
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);
    return res
      .status(201)
      .json({ message: "Added comment.", comment: newComment });
  }
};

export default handler;
