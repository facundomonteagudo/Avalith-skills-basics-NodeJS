const express = require("express");
const fs = require("fs").promises;

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send(
    `<h1>Avalith Skill Basics Node</h1> 
    <br> 
    <h2> Facundo <em>Monteagudo</em></h2>
    <br>
    <a href="/date">/date</a> <b>get the current date time.</b>
    <p> <b>/greetings reply with a greeting to a name sent by POST (json or urlencoded).</b></p> 
    <a href="/text">/text</a> <b>txt file read with fs.</b>
    `
  );
});

app.get("/date", (_, res) => {
  res.send({ date: `${new Date()}` }).status(200);
});

app.get("/text", async (_, res) => {
  try {
    res.send(await fs.readFile("./star-wars-ipsum.txt", "utf-8")).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.post("/greetings", (req, res) => {
  if (!req.body.name)
    res.status(400).json({ message: "Please provide a name" });

  res.send(`Buenos dias ${req.body.name}`).status(200);
});

app.listen(port, () => {
  ///for example reasons I use console.log instead of
  ///another logger that does not block I/O.
  console.log(`app listening at http://localhost:${port}`);
});
