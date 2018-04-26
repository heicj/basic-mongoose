async function routes(fastify, options){
    fastify.get('/', async(request, reply) => {
        return { hello: 'world' };
    });
}

module.exports = routes;

// const express = require('express');
// const app = express();
// const teams = require('./routes/teams');

// app.use(express.json());

// app.use('/teams', teams);

// module.exports = app;