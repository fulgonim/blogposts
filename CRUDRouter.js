const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// Here are some example posts to start:
// format for input: (title, content, author, publishDate)

BlogPosts.create('My First Blog Post', 'This blog is going to be super amazing!', 'Max Fulgoni', '1/18/2018');
BlogPosts.create('My Second Blog Post', 'This blog is going to be even more super amazing!', 'Max Fulgoni', '1/19/2018');
BlogPosts.create('My Third Blog Post', 'This blog is less amazing, bad day', 'Max Fulgoni', '1/20/2018');
BlogPosts.create('My Fourth Blog Post', 'This blog is going to be super amazing!', 'Max Fulgoni', '1/21/2018');


// send JSON response of all blog posts on GET requests to /blog-post route
router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});


// when a new blog is added, make sure required fields are present
// if not log error and return 400 status code w/ message
// if all good, add new blog post and return it with status 201

router.post('/', jsonParser, (req, res) => {

	// ensure 'title' 'content' 'author' and 'publishDate' are present
	// publish date should be the date it is submitted
	const requiredFields = ['title', 'content', 'author'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(newPost);
});


router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post with id of: \'${req.params.id}\'`);
	res.status(204).end();
});

// when PUT request comes in with new blog post
// check required fields (and id)
// if all okay, update post calling BlogPosts.update
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id `
			`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post with id of: \'${req.params.id}\'`);
	const updatedPost = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	});
	res.status(204).end();
});



module.exports = router;