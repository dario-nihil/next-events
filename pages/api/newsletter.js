const handler = (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    return res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
