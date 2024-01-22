const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Document = require('../models/documentModel');

exports.createDocument = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const { contents } = req.body;

	const doc = await Document.create({ userId, contents });

	res.status(200).json({
		status: 'success',
		data: {
			document: doc,
		},
	});
});

exports.findMyDocuments = catchAsync(async (req, res, next) => {
	const doc = await Document.find({ userId: req.user.id });

	res.status(200).json({
		status: 'success',
		data: {
			document: doc,
		},
	});
});

exports.findSingleDocument = catchAsync(async (req, res, next) => {
	const doc = await Document.findById(req.params.id);

	if (!doc) {
		return next(new AppError(`No document is found with that Id`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			document: doc,
		},
	});
});

exports.updateDocument = catchAsync(async (req, res, next) => {
	const doc = await Document.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		return next(new AppError(`No document is found with that Id`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			document: doc,
		},
	});
});

exports.deleteDocument = catchAsync(async (req, res, next) => {
	const doc = await Document.findByIdAndDelete(req.params.id);

	if (!doc) {
		return next(new AppError(`No document is found with that Id`, 404));
	}

	res.status(201).json({
		status: 'success',
		data: {
			document: null,
		},
	});
});
