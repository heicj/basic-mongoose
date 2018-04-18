const router = require('express').Router();
const Team = require('../models/BBTeam');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Team.create(req.body)
            .then(team => res.json(team))
            .catch(err => errorHandler(err, req, res));
    });