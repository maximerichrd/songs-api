"use strict";
//import Knex from "knex"
exports.__esModule = true;
exports.knex = void 0;
/* export const knex = Knex({
    client: "mysql",
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : 'user',
      password : 'password',
      database : 'songsdb',
      port: 6606
    },
  }) */
exports.knex = require('knex')({
    client: "mysql",
    version: '5.7',
    connection: {
        host: '127.0.0.1',
        user: 'user',
        password: 'password',
        database: 'songsdb',
        port: 6606
    }
});
