const { assert } = require('chai');
const request = require('./request');
const Team = require('../../lib/models/BBTeam');
const { dropCollection } = require('./db');

describe('team api', () => {
    before(() => dropCollection('teams'));

    let duke = {
        teamName: 'Duke Bluedevils',
        coach: 'Coach K',
        location: {
            state: 'NC'
        },
        players: ['player1']
    };

    let blazers = {
        teamName: 'Trailblazers',
        coach: 'Stotts',
        location: {
            state: 'OR'
        },
        players: ['player2']
    };

    // it('saves and gets a pirate', () => {
    //     return new Team(duke).save()
    //         .then(saved => {
    //             saved = saved.toJSON();
    //             const { _id, __v } = saved;
    //             assert.ok(_id);
    //         });
    // });

    it('saves and gets a pirate', () => {
        return request.post('/teams')
            .send(duke)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...duke
                });
                duke = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets tetam by id', () => {
        return Team.create(blazers).then(roundTrip)
            .then(saved => {
                blazers = saved;
                return request.get(`/teams/${blazers._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, blazers);
            });
    });

    it('update a team', () => {
        blazers.coach = 'Mr Stotts';

        return request.put(`/teams/${blazers._id}`)
            .send(blazers)
            .then(({ body }) => {
                assert.deepEqual(body, blazers);
                return Team.findById(blazers._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, blazers);
            });
    });

    const getFields = ({ _id, teamName, coach }) => ({ _id, teamName, coach });

    it('gets all teams but only _id, teamName, and coach', () => {
        return request.get('/teams')
            .then(({ body }) => {
                assert.deepEqual(body, [duke, blazers].map(getFields));
            });
    });

    it('queries a team', () => {
        return request.get('/teams?location.state=OR')
            .then(({ body }) => {
                assert.deepEqual(body, [blazers].map(getFields));
            });
    });

    it('deletes team by id', () => {
        return request.delete(`/teams/${blazers._id}`)
            .then(() => {
                return Team.findById(blazers._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

});