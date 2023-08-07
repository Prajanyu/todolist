const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require('./models/Todo');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to Database");
})
.catch(console.error);

app.get("/todo", async (req, res) => {
    const items = await Todo.find();

    res.json(items);
});

app.post("/todo/new", (req, res) => {    
    const todo = new Todo({
        content: req.body.content
    });

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.put('/todo/update/:id', async (req, res) => {
    const result = await Todo.findById(req.params.id);

    result.isComplete = !result.isComplete;

    result.save();

    res.json(result);
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

