const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// Here are some example posts to start:
// format for input: (title, content, author, publishDate)

BlogPosts.create('My First Blog Post', 'This blog is going to be super amazing!', 'Max Fulgoni', '1/21/2018');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

module.exports = router;