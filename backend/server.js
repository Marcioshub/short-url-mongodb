const express = require("express");
const connectDB = require("./config/db");
const randomChars = require("random-chars");
const Url = require("./model/Url");
require("dotenv").config();
require("colors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  return res.json({
    msg: "hello",
  });
});

app.post("/c", async (req, res) => {
  try {
    const { url } = req.body;

    console.log("called", req.body);

    if (!url || url == "" || url.trim() == "") {
      throw new Error("Url is blank");
    }

    // create new record
    const su = await Url.create({ original: url, short: randomChars.get(5) });

    res.json({
      shortenUrl: su.short,
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.json({
      err: err.message,
    });
  }
});

app.get("/r/:url", async (req, res) => {
  try {
    const { url } = req.params;

    if (!url || url == "" || url.trim() == "") {
      throw new Error("Url is blank");
    }

    // get original url
    const su = await Url.findOne({ short: url });

    if (!su) {
      throw new Error(
        "Url not on database, your short url may have already expired!"
      );
    }

    res.json({
      original: su.original,
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.json({
      err: err.message,
    });
  }
});

app.get("/api/urls", async (req, res) => {
  try {
    // get original url
    const urls = await Url.find();

    res.json(urls);
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.json({
      err: err.message,
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
