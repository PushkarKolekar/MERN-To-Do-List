const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://pushkar:mongodb@mern.vkyawn5.mongodb.net/Project?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to DB"))
  .catch(console.error)
  .catch(console.error);
const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put("/todo/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;

  todo.save();
  res.json(todo);
});

app.listen(5500, () => console.log("server started on port 5500"));
