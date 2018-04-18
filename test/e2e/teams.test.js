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
        }
    };

    let blazers = {
        teamName: 'Trailblazers',
        coach: 'Stotts',
        location: {
            state: 'OR'
        }
    };

    it('saves and gets a pirate', () => {
        return new Team(duke).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v } = saved;
                assert.ok(_id);
            });
    });

});