import { Knex } from "knex"

export async function ApplyMigrations(knex: Knex) {
    console.log("Applying migrations...")
    await knex.migrate.latest({ directory: "./knex/migrations" }).catch((reason) => {
        console.error("Unable to migrate DB.")
        console.error(reason)
        process.exit(1)
    })
    console.log("Applied migrations !")
}