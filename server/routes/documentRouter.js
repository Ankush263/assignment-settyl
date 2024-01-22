const express = require('express');

const { protect } = require('../controllers/authControllers');

const {
	createDocument,
	findMyDocuments,
	findSingleDocument,
	updateDocument,
	deleteDocument,
} = require('../controllers/documentControllers');

const router = express.Router();

router.use(protect);

router.route('/myDocs').get(findMyDocuments);
router.route('/').post(createDocument);
router
	.route('/:id')
	.get(findSingleDocument)
	.patch(updateDocument)
	.delete(deleteDocument);

module.exports = router;
