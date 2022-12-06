const mongoose = require('mongoose')

const EmpSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const Emp = mongoose.model('Emps', EmpSchema)
// "Emps" is the collection name ***
// But it will be reflected as "emps" in mondodb (in small letters) ***
module.exports = Emp
