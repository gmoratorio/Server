exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE snowboard; ALTER SEQUENCE snowboard_id_seq restart with 11;')
    .then(function () {
      const snowboards = [{
        make:'Libtech',
        model:'Gateway',
        size: 157.5,
        price: 342.95,
        flex: 8
      },
      {
        make:'Libtech',
        model:'Powder Hole',
        size: 165,
        price: 679.95,
        flex: 6
      },
      {
        make:'Capita',
        model:'Gateway',
        size: 157.5,
        price: 342.95,
        flex: 8
      },
      {
        make:'Capia',
        model:'Peter Line',
        size: 153,
        price: 499.95,
        flex: 6
      },
      {
        make:'Rome',
        model:'Agent',
        size: 149.5,
        price: 377.95,
        flex: 9
      },
      {
        make:'Rome',
        model:'Artifact',
        size: 150,
        price: 279.95,
        flex: 7
      },
      {
        make:'Rome',
        model:'Mode',
        size: 157.5,
        price: 599.95,
        flex: 5
      },
      {
        make:'Burton',
        model:'Custom',
        size: 165.5,
        price: 899.95,
        flex: 6
      },
      {
        make:'Gnu',
        model:'Club',
        size: 155,
        price: 391.95,
        flex: 7
      },
      {
        make:'Ride',
        model:'Alter Ego',
        size: 159,
        price: 391.95,
        flex: 5
      },
      ];

      return knex('snowboard').insert(snowboards);
    });
};
