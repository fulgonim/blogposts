const express = require('express');
const morgan = require('morgan');

const app = express();

const CRUDRouter = require('./CRUDRouter');
//const deletePutRouter = require('./deletePutRouter');


app.use(morgan('common'));


//requests for GET and POST that come into /blog-posts are routed to getPostRouter.js 
//requests for DELETE and PUT that come into /blog-posts/:id are routed to deletePutRouter.js

app.use('/blog-posts', CRUDRouter);
//app.use('/blog-posts/:id', deletePutRouter);



app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});