exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 9')
        .then(function() {
            const events = [{
                id: 1,
                link: 'https://www.facebook.com/events/1864904230404701/',
                description: 'Ratio is kicking off a new comedy series called “Live at Ratio” and the first installment features Ian Douglas Terry. The show will be video/audio recorded. Hosted by Andrew Bueno with support from Geoff Tice and Nicole Conlan. FREE.',
                data: 'Wednesday, December 28, 2016',
                time: '8 – 10pm',
                price: 5.55,
                Eventname: 'Live Comedy Taping: Ian Douglas Terry'
            }, {
                id: 2,
                link: 'https://www.facebook.com/events/153266558485057/',
                description: 'Still looking to pad out your holiday decorations? Head over to Grandma’s House, where a $10 donation to Urban Peak will get you everything needed to build a gingerbread house.',
                data: 'Thursday, December 29, 2016',
                time: '4 – 10pm',
                price: 10.00,
                Eventname: 'Gingerbread House Decorating at Grandma’s House"'
            },
            {
                id: 3,
                link: 'https://www.facebook.com/events/189657274838392/',
                description: 'Stave off your hangover by tying on another at Epic where they’ll be screening football and serving up breakfast dishes from Mile High Cajun. Take a photo on their red carpet walk of shame while getting 10% off your tab if you show up in pajamas and 20% off if you are wearing what you were the night before.',
                data: 'Sunday, January 1, 2017',
                time: '11am',
                Eventname: ' – 9pm: Holiday Hangover Party'
            },
            {
                id: 4,
                link: 'https://www.facebook.com/events/1827525967523347/',
                description: 'Beryl’s flips Monday the bird with specialty keg tappings each week.',
                date: 'Monday, January 2, 2017',
                time: '3 – 10pm',
                eventName: 'FU Mondays at Beryl’s Beer Co.'
            },
            {
                id: 5,
                link: 'https://www.facebook.com/events/106643546502749/',
                description: 'Call to Arms will be tapping specialty one-off Lagers all week. On Tuesday, sample Khores Fiesta Beer, a version of Khores Ballroom Beer with chilis. The week culminates with the release of Nine-Toed Woman—a reimagined Swedish lager—on Friday.',
                data: 'Tuesday, December 27 – Friday, December 30, 2016',
                time: '11am',
                Eventname: 'Lager Tuesday'
            },{
                id: 6,
                description: 'Nuggets take on the Golden State',
                data: 'Tuesday, December 27 – Friday, December 30, 2016',
                time: '9pm',
                Eventname: 'Nugget Vs. Golden State'
            },
            {
                id: 7,
                description: 'Local Artist Den Harold displays work',
                data: 'December 28, 2016',
                time: '8pm',
                Eventname: 'Harold Gallery'
            },
            {
                id: 8,
                description: 'Flume plays at the Ogden',
                data: 'December 27, 2016',
                time: '8pm',
                Eventname: 'Flume Live at The Ogden'
            }];
          return knex('event').insert(events);
        });

};
