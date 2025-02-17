const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./modules/auth/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))


app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  if (statusCode === 500) {
    console.log(err);
  }
  res.status(statusCode).send({
    status: statusCode,
    massege: err.massege,
  });
});

module.exports = app;
