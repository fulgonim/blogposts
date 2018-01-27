const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHTTP);

describe('Blogposts', function() {
	//before tests run, activate server using runServer()

	before(function() {
		return runServer();

	});

	after(function() {
		return closeServer();
	});

	//test strategy:
	//1. make GET request to '/blog-posts'
	//2. inspect response object and verify correct code and keys within
	it('should list blogposts on GET', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('array');

				//already created 4 blogposts
				expect(res.body.length).to.be.at.least(1);
				//each item should be an object w/ key/value pairs
				//for 'id', 'title', 'content', 'author', 'publishDate'
				const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
				res.body.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				});
			});
	});

	//test strategy for POST
	//1. make POST request to '/blog-posts' with data for a new item
	//2. inspect the response object and prove it has the right
	//3. status code and the returned object has an 'id'

	it('should add a new blogpost on POST', function() {
		const newItem = {
			title: "New Blogpost for Test", 
			content: "New content for new blogpost, this is pretty great",
			author: "Marco Antonio Xavier Fulgoni",
			publishDate: "1/27/2018"
		};

		return chai.request(app)
			.post('/blog-posts')
			.send(newItem)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');

				const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
				expect(res.body).to.include.keys(expectedKeys);
				expect(res.body.id).to.not.equal(null);

				expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
			});
	});

	//test strategy for PUT
	//1. create update data
	//2. make GET request to get an item to update
	//3. add id to updateData
	//4. make PUT request with updateData
	//5. inspect response object to verify status code and correctly updated data

	it('should update blogposts on PUT', function() {
		const updateData = {
			title: "Newly Updated Blogpost for test",
			content: "Newly updated content for new blogpost",
			author: "Max Fulgoni",
			publishDate: "1/27/2018"
		};

		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				updateData.id = res.body[0].id;

				return chai.request(app)
					.put(`/blog-posts/${updateData.id}`)
					.send(updateData);
			})
			.then(function(res) {
				expect(res).to.have.status(200);
				//expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(updateData);
			});
	});

	//test strategy:
	//1. GET blogpost items so we can get ID of one to delete
	//2. DELETE an item and ensure we get back a status of 204
	it('should delete blogposts on DELETE', function() {
		return chai.request(app)

			.get('/blog-posts')
			.then(function(res) {
				return chai.request(app)
					.delete(`/blog-posts/${res.body[0].id}`);
			})
			.then(function(res) {
				expect(res).to.have.status(204);
			});
	});







});