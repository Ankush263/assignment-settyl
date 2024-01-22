const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const UserRouter = require('./routes/userRouter');
const DocumentRouter = require('./routes/documentRouter');
const Document = require('./models/documentModel');
const dotenv = require('dotenv');
dotenv.config({});

const io = require('socket.io')(process.env.PORT || 500, {
	cors: {
		origin: 'https://assignment-settyl.vercel.app/',
		methods: ['GET', 'POST'],
	},
});

const app = express();

app.enable('trust proxy');

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());

app.use(express.static(path.join(__dirname, 'views')));

io.on('connection', (socket) => {
	socket.on('get-document', async (documentId) => {
		const doc = await Document.findById(documentId);
		const data = doc.contents || '';
		socket.join(documentId);
		socket.emit('load-document', data);

		socket.on('send-changes', (delta) => {
			socket.broadcast.to(documentId).emit('receive-changes', delta);
		});

		socket.on('save-document', async (data) => {
			await Document.findByIdAndUpdate(
				documentId,
				{ contents: data },
				{
					new: true,
					runValidators: true,
				}
			);
		});
	});
});

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/document', DocumentRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
