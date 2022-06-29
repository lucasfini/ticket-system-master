const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ticketSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true},
	title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String, required: false},
    priority: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    solution: {type: String, required: false}
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
