const Team = require('./models/BBTeam');

async function routes(fastify, options){
    fastify.get('/teams', async(request, reply) => {
        return { hello: 'world' };
    });

    fastify.post('/teams', async(request, reply) => {
        Team.create(request.body)
            .then(team => reply.json(team))
    });
}

module.exports = routes;

// const express = require('express');
// const app = express();
// const teams = require('./routes/teams');

// app.use(express.json());

// app.use('/teams', teams);

// module.exports = app;