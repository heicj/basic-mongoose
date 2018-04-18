# MONGOOSE

# Author
    Charlie Heiner

# How To Use
## GET requests to /teams
* `/teams` 
    * returns **all teams in db**

* `teams/id`
    * returns **team with that id**

## POST request to /teams
* adds team to db

## PUT request to /teams/id
* updates **team with that id**

## DELETE request to /teams/id
* deletes **team with that id**

## Team Model
    teamName: String, required
    coach: String,
    stadium: {
        name: String,
        capacity: {
            type: Number,
            min: 0
        }
    },
    location: {
        state: {
            type: String, required
            Must be one of the following: 
                ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC',  
                'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA',  
                'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',  
                'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',  
                'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
        },
        city: String
    },
    players: Array of Strings

### Example Team
    const team = {
        teamName: 'Example Team',
        coach: 'John Doe',
        stadium: {
            name: 'The Dome',
            capacity: 10000
        },
        location: {
            state: 'OR',
            city: 'Portland'
        },
        players: ['player1', 'player2', 'player3']
    }


