require("dotenv").config();

const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");
const express = require("express");
const app = express();
app.use(express.json());

const connection=require("./database/connection");

// const { MongoClient } = require('mongodb');
// const mongodb =
//   "mongodb+srv://vansh_jaiswal:vansh123@cluster0.xzqxs.mongodb.net/BOOK-COMPANY-API?retryWrites=true&w=majority";
// mongoose
//   .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connection Established"));
// client.connect(err => {
//   const bcollection = client.db("BOOK-COMPANY-API").collection("books").findOne({ISBN:"12345three"});
//   bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
//   // perform actions on the collection object
// });
// client.close();

app.get("/",async(req,res)=>{
  res.send("Welcome to BOOK API PROJECT");
})

app.get("/books", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});
app.get("/bookISBN/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const getspecificBook = await BookModel.findOne({ ISBN: isbn });

  if (getspecificBook === null) {
    return res.json({ error: `No book found for the ISBN of ${isbn}` });
  }
  return res.json(getspecificBook);
});
app.get("/bookCategory/:cat", async (req, res) => {
  const { cat } = req.params;
  // console.log(cat);
  const getCategoryBook = await BookModel.find({ category: cat });
  // console.log(getCategoryBook);
  // console.log(getCategoryBook.length)
  if (getCategoryBook.length == 0) {
    return res.json({ error: `No book found for the category of ${cat}` });
  }
  return res.json(getCategoryBook);
});

app.get("/authors", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});
app.get("/authorID/:ID", async (req, res) => {
  let { ID } = req.params;
  ID = Number(ID);
  const getAuthorID = await AuthorModel.findOne({ id: ID });
  if (getAuthorID == null) {
    return res.json({ Error: `No author found for ID:${ID}` });
  }
  return res.json(getAuthorID);
});
app.get("/authorBooks/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const getAuthorBooks = await AuthorModel.find({ books: isbn });
  if (getAuthorBooks.length == 0) {
    return res.json({ error: `No author found for ISBN:${isbn}` });
  }
  return res.json(getAuthorBooks);
});
app.get("/publications", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});
app.get("/publicationsBooks/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const publicationsBooks = await PublicationModel.find({ books: isbn });

  if (publicationsBooks.length == 0) {
    return res.json({ error: `No publications found for the isbn ${isbn}` });
  }
  return res.json(publicationsBooks);
});
app.post("/book", async (req, res) => {
  const newBookAdded = await BookModel.create(req.body);
  res.json({
    books: newBookAdded,
    message: "New Book added Successfully",
  });
});
app.post("/author", async (req, res) => {
  const addNewAuthor = await AuthorModel.create(req.body);
  return res.json({
    authors: addNewAuthor,
    message: "New author added successfully",
  });
});
app.post("/publication", async (req, res) => {
  const newPubAdded = await PublicationModel.create(req.body);
  return res.json({
    publications: newPubAdded,
    message: "New Publication Added Successfully",
  });
});
app.put("/bookUpdate/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const updateBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    req.body,
    { new: true }
  );
  return res.json({
    bookUpdated: updateBook,
    message: "Book Updated Successfully",
  });
});
app.put("/authorUpdate/:ID", async (req, res) => {
  let { ID } = req.params;
  ID = Number(ID);
  const updateAuthor = await AuthorModel.findOneAndUpdate(
    { id: ID },
    req.body,
    { new: true }
  );
  return res.json({
    authorUpdated: updateAuthor,
    message: "Author Updated Successfully",
  });
});
app.put("/publicationUpdate/:ID", async (req, res) => {
  let { ID } = req.params;
  ID = Number(ID);
  const updatePublication = await PublicationModel.findOneAndUpdate(
    { id: ID },
    req.body,
    { new: true }
  );
  return res.json({
    PublicationUpdated: updatePublication,
    message: "Publication Updated Successfully",
  });
});
app.delete("/Deletebook/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const Deletebook = await BookModel.deleteOne({ ISBN: isbn });
  if (Deletebook == null) {
    return res.json({ error: `Book Model doesn't contain ISBN:${isbn}` });
  }
  return res.json(Deletebook);
});
app.delete("/Deleteauthor/:ID", async (req, res) => {
  let { ID } = req.params;
  ID = Number(ID);
  const Deleteauthor = await AuthorModel.deleteOne({ id: ID });
  if (Deleteauthor == null) {
    return res.json({ error: `Author Model doesn't contain ID:${ID}` });
  }

  res.json(Deleteauthor);
});
app.delete("/Deletepublication/:ID", async (req, res) => {
  let { ID } = req.params;
  ID = Number(ID);
  const Deletepublication = await PublicationModel.deleteOne({ id: ID });
  if (Deletepublication == null) {
    return res.json({ error: `Publication Model doesn't contain ID:${ID}` });
  }

  res.json(Deletepublication);
});
app.delete("/Deletebook-author/:isbn/:ID", async (req, res) => {
  let { isbn, ID } = req.params;
  ID = Number(ID);

  const deleteBookauthor = await BookModel.findOne({ ISBN: isbn });
  if (deleteBookauthor == null) {
    return res.json({ error: `No book is available for ISBN:${isbn}` });
  } else {
    deleteBookauthor.authors.remove(ID);
    const updateBookAuthor = await BookModel.findOneAndUpdate(
      { ISBN: isbn },
      deleteBookauthor,
      { new: true }
    );
    res.json({
      UpdatedBook: updateBookAuthor,
      message: "Author removed Successfully",
    });
  }
});
app.listen(3000, () => {
  connection().then(()=>{console.log("Server is running!")}).catch((error)=>{console.log("Server is running but database connection failed!");
  console.log(error);
  });
});
