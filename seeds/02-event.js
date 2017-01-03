exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "event"; ALTER SEQUENCE event_id_seq RESTART WITH 1')
        .then(function() {
            const events = [{
                sourceName: 'Dear Denver',
                eventLink: 'https://www.facebook.com/events/1864904230404701/',
                description: 'Ratio is kicking off a new comedy series called Live at Ratio',
                date: 'Wednesday, December 28, 2016',
                time: '8 – 10pm',
                eventName: 'Live Comedy Taping: Ian Douglas Terry'
            },
            {
                sourceName: 'Dear Denver',
                eventLink: 'https://www.facebook.com/events/153266558485057/',
                description: 'Still looking to pad out your holiday decorations?',
                date: 'Thursday, December 29, 2016',
                time: '4 – 10pm',
                eventName: 'Gingerbread House Decorating at Grandma’s House'
            },
            {
                sourceName: 'Dear Denver',
                eventLink: 'https://www.facebook.com/events/189657274838392/',
                description: 'Stave off your hangover by tying on another at Epic where they’ll be screening football and breakfast',
                date: 'Sunday, January 1, 2017',
                time: '11am',
                eventName: ' – 9pm: Holiday Hangover Party'
            },
            {
                sourceName: 'Dear Denver',
                eventLink: 'https://www.facebook.com/events/1827525967523347/',
                description: 'Beryl’s flips Monday the bird with specialty keg tappings each week.',
                date: 'Monday, January 2, 2017',
                time: '3 – 10pm',
                eventName: 'FU Mondays at Beryl’s Beer Co.'
            },
            {
                sourceName: 'Dear Denver',
                eventLink: 'https://www.facebook.com/events/106643546502749/',
                description: 'Call to Arms will be tapping specialty one-off Lagers all week. ',
                date: 'Tuesday, December 27 – Friday, December 30, 2016',
                time: '11am',
                eventName: 'Lager Tuesday'
            },
            {
                eventLink: 'https://www.facebook.com/events/106643546502749/',
                description: 'Nuggets take on the Golden State',
                date: 'Tuesday, December 27 – Friday, December 30, 2016',
                time: '9pm',
                eventName: 'Nugget Vs. Golden State'
            },
            {
                eventLink: 'https://www.facebook.com/events/106643546502749/',
                description: 'Local Artist Den Harold displays work',
                date: 'December 28, 2016',
                time: '8pm',
                eventName: 'Harold Gallery'
            },
            {
                eventLink: 'https://www.facebook.com/events/106643546502749/',
                description: 'Flume plays at the Ogden',
                date: 'December 27, 2016',
                time: '8pm',
                eventName: 'Flume Live at The Ogden'
            }];
          return knex('event').insert(events);
        });

};
