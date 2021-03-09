const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/gocodeshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find({}).exec();
  console.log("products", products);
  const { q } = req.query;
  if (q) {
    res.send(
      products.filter(
        (product) =>
          product.title.includes(q) ||
          product.description.includes(q) ||
          product.category.includes(q)
      )
    );
  } else {
    res.send(products);
  }
});

app.get("/products/:productId", async (req, res) => {
  let productId = req.params.productId;
  console.log(productId);
  const product = await Product.findById(productId).exec();
  res.send(product);
});

app.post("/products", (req, res) => {
  const { title, image, price, category, description } = req.body;
  new Product({ title, image, price, category, description }).save();
  res.send("OK!");
});

app.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, image, price, description, category } = req.body;
  await Product.updateOne(
    { _id: productId },
    { title, image, price, description, category },
    { omitUndefined: true }
  ).exec();
  res.send("OK!");
});

app.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  await Product.deleteOne({ _id: productId }).exec();
  res.send("OK!");
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const PORT = 8000;
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`Gocode App Server listening on port ${PORT}`);
  });
});
