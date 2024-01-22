const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Must belongs to a user'],
		},
		contents: {
			type: Object,
			default: {},
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
