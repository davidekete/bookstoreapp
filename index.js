const express = require("express");
const app = express();
const port = 3000;
const bookRouter = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bookRouter);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
