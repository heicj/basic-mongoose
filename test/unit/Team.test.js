const { assert } = require('chai');
const Team = require('../../lib/models/BBTeam');

describe('Team model', () => {
    
    it('valid team model', () => {
        const data = {
            teamName: 'Newbies',
            coach: 'Shooter',
            stadium: {
                name: 'Stadium Name For Sale',
                capacity: 10000
            },
            location: {
                state: 'OR',
                city: 'Portland'
            },
            players: ['Player1', 'Player2', 'Player3']
        };
    
        const team = new Team(data);
    
        assert.deepEqual(team.toJSON(), {
            _id: team._id,
            ...data
        });

        assert.isUndefined(team.validateSync());
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };

    it('name is required field', () => {
        const team = new Team({});
        const errors = getValidationErrors(team.validateSync());
        assert.equal(Object.keys(errors).length, 2);
        assert.equal(errors.teamName.kind, 'required');
        assert.equal(errors['location.state'].kind, 'required');
    });

    it('stadium capacity must be positive, state must be enum', () => {
        const team = new Team({
            teamName: 'testTeam',
            stadium: {
                capacity: -5
            },
            loation: {

                state: 'Oregon'
            }
        });

        const errors = getValidationErrors(team.validateSync());
        assert.equal(errors['stadium.capacity'].kind, 'min');
        assert.equal(errors['location.state'].kind, 'required'); //why not enum error?
    });

});