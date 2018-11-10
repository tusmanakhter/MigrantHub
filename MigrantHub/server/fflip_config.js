module.exports = {
    criteria:[
        {
            id: 'isMigrant',
            check: function(user) {
                return user.type == 'migrant';
            }
        },
    ],
    features:[
        {
            id: 'migrantContact',
            criteria: {isMigrant: true},
            name: 'An Experimental Feature to test merchant contact page',
            description: 'Experimental feature',
            owner: 'iamlax',
        },
    ]
};