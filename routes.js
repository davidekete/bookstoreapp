const express = require("express");
const router = express.Router();
const db = require("./db/db.js");

// GET /books
router.get("/books", async (req, res) => {
  try {
    const books = await db("books");
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//POST /books/new
router.post("/books/new", async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await db("books").insert({
      title,
      author,
      genre,
    });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//PUT /books/:id
router.put("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { title, author, genre } = req.body;
    const book = await db("books").where({ id }).update(
      {
        title,
        author,
        genre,
      },
      ["id", "title", "author", "genre"]
    );

    if (book.length !== 0) {
      res.status(201).send(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//DELETE /books/:id
router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await db("books").where({ id }).del();

    if (book !== 0) {
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
