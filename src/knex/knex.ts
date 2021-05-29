import knexBuilder from "knex"
import {Knex} from "knex"

export const knex: Knex = knexBuilder({
    client: "mysql",
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : 'user',
      password : 'password',
      database : 'songs-db',
      port: 6606
    },
  })

