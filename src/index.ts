import * as E from "fp-ts/Either"
import { pipe } from 'fp-ts/lib/pipeable'
import { knex } from './knex/knex'
import { PlaylistReaderImpl } from "./persistence/playlists/PlaylistReader"

PlaylistReaderImpl(knex).findOne(1, 5)().then((eitherPlaylist) =>
    pipe(
        eitherPlaylist,
        E.fold(
            (error) => console.log(error),
            (playlist) => console.log(playlist)
        )
    )
)

