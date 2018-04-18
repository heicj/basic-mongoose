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

});