const router = require('express').Router();
const Team = require('../models/BBTeam');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Team.create(req.body)
            .then(team => res.json(team))
            .catch(err => errorHandler(err, req, res));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;

        Team.findById(id)
            .lean()
            .then(team => {
                if(!team){
                    errorHandler({
                        status: 404,
                        error: `Team with id ${id} does not exist`
                    }, req, res);
                }
                else res.json(team);
            })
            .catch(err => errorHandler(err, req, res));
    });