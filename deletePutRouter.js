const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


// delete blogposts by ID
router.delete('/', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted shopping list item \'${req.params.id}\'`);
	res.status(204).end();
});

module.exports = router;