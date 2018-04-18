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
    })
    
    .put('/:id', (req, res) => {
        Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(team => res.json(team))
            .catch(err => errorHandler(err, req, res));
    })
    
    .get('/', (req, res) => {
        Team.find(req.query)
            .lean()
            .select('teamName coach')
            .then(teams => res.json(teams))
            .catch(err => errorHandler(err, req, res));
    })
    
    .delete('/:id', (req, res) => {
        Team.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });