const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect("mongodb+srv://gocode:12345@cluster0.own0i.mongodb.net/gocode?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "client/build")));

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);


const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, 
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(todos.filter((todo) => todo.title.includes(q)));
  } else {
    res.send(todos);
  }
});

app.get("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const todo = await Todo.findById(todoId).exec();
  res.send(todo ?? {});
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const todo = await new Todo({ title, completed: false }).save();
  console.log('POST!', todo);
  res.send(todo);
});

app.put("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  await Todo.updateOne({ _id: todoId }, { title }).exec();

  res.send("OK!");
});

app.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  await Todo.deleteOne({ _id: todoId }).exec();

  res.send("OK!");
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });
});
