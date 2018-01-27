const express = require('express');
const morgan = require('morgan');

const app = express();

const CRUDRouter = require('./CRUDRouter');
//const deletePutRouter = require('./deletePutRouter');


app.use(morgan('common'));


//requests for GET and POST that come into /blog-posts are routed to getPostRouter.js 
//requests for DELETE and PUT that come into /blog-posts/:id are routed to deletePutRouter.js

app.use('/blog-posts', CRUDRouter);

// declare a server object here for runServer and closeServer functions
let server;

// this function starts the server and returns a Promise
function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app.listen(port, () => {
			console.log(`Your app is listening on ${port}`);
			resolve(server);
		}).on('error', err => {
			reject(err)
		});
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
};

/*app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
}); */