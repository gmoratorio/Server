


exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "event"; ALTER SEQUENCE event_id_seq RESTART WITH 9')
        .then(function() {
            const events = [{
                id: 1,
                source_name: 'Dear Denver',
                event_link: 'https://www.facebook.com/events/1864904230404701/',
                description: 'Ratio is kicking off a new comedy series called Live at Ratio',
                date: "2016-12-28T07:00:00.000Z",
                time: '8 – 10pm',
                event_name: 'Live Comedy Taping: Ian Douglas Terry'
            },
            {
                id: 2,
                source_name: 'Dear Denver',
                event_link: 'https://www.facebook.com/events/153266558485057/',
                description: 'Still looking to pad out your holiday decorations?',
                date: "2017-01-01T07:00:00.000Z",
                time: '4 – 10pm',
                event_name: 'Gingerbread House Decorating at Grandma’s House'
            },
            {
                id: 3,
                source_name: 'Dear Denver',
                event_link: 'https://www.facebook.com/events/189657274838392/',
                description: 'Stave off your hangover by tying on another at Epic where they’ll be screening football and breakfast',
                date: "2017-01-01T07:00:00.000Z",
                time: '11am',
                event_name: ' – 9pm: Holiday Hangover Party'
            },
            {
                id: 4,
                source_name: 'Dear Denver',
                event_link: 'https://www.facebook.com/events/1827525967523347/',
                description: 'Beryl’s flips Monday the bird with specialty keg tappings each week.',
                date: "2017-01-02T07:00:00.000Z",
                time: '3 – 10pm',
                event_name: 'FU Mondays at Beryl’s Beer Co.'
            },
            {
                id: 5,
                source_name: 'Dear Denver',
                event_link: 'https://www.facebook.com/events/106643546502749/',
                description: 'Call to Arms will be tapping specialty one-off Lagers all week. ',
                date: "2017-01-01T07:00:00.000Z",
                time: '11am',
                event_name: 'Lager Tuesday'
            },
            {
                id: 6,
                event_link: 'https://www.facebook.com/events/106643546502749/',
                description: 'Nuggets take on the Golden State',
                date: "2017-01-01T07:00:00.000Z",
                time: '9pm',
                event_name: 'Nugget Vs. Golden State'
            },
            {
                id: 7,
                event_link: 'https://www.facebook.com/events/106643546502749/',
                description: 'Local Artist Den Harold displays work',
                date: "2016-11-17T07:00:00.000Z",
                time: '8pm',
                event_name: 'Harold Gallery'
            },
            {
                id: 8,
                event_link: 'https://www.facebook.com/events/106643546502749/',
                description: 'Flume plays at the Ogden',
                date: "2016-11-17T07:00:00.000Z",
                time: '8pm',
                event_name: 'Flume Live at The Ogden'
            }];
          return knex('event').insert(events);
        });

};
