const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    } 
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

