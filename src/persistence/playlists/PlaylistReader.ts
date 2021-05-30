import * as TE from "fp-ts/lib/TaskEither"
import * as Knex from "knex"
import { TaskEither } from "fp-ts/lib/TaskEither"
import { knex } from "../../knex/knex"
import { Song } from "../../models/Types"
import { User } from "../../models/Types"
import { Playlist } from "../../models/Types"
import { DescriptionTranslation } from "../../models/Types"
import { DomainError } from "../../models/ErrorTypes"
import * as playlistSchema from "./PlaylistSchema"
import { PlaylistRow } from "../playlists/PlaylistRow"
import { pipe } from "fp-ts/lib/pipeable"
import { executeQuery } from "../../knex/dbUtils"

export interface PlayListReader {
    findOne(userID: number, playlistID: number): TaskEither<DomainError, PlaylistRow[]>
}

export function PlaylistReaderImpl(knex: Knex): PlayListReader {
    return {
        findOne: findOne(knex)
    }
}

function findOne(knex) {
    return (userID: number, playlistID: number): TaskEither<DomainError, PlaylistRow[]> => {
        const selectPlaylistQuery = 
            buildSelectQueryPlaylist(knex)(selectPlaylistFields)
                .where(`${playlistSchema.columns.userId}`, userID)
                .andWhere(`${playlistSchema.columns.id}`, playlistID)
        
        return pipe(
            TE.Do,
            TE.bind("playlistRows", () =>
                executeQuery<PlaylistRow, PlaylistRow[]>(selectPlaylistQuery)
            ),
            TE.map(({playlistRows}) => playlistRows)
        )
    }
}

const buildSelectQueryPlaylist = (knex: Knex) => (
    baseQueryBuilder: (knex: Knex) => Knex.QueryBuilder
): Knex.QueryBuilder<PlaylistRow, PlaylistRow[]> => 
    baseQueryBuilder(knex)
        .from(playlistSchema.tableName)

const selectPlaylistFields = (knex: Knex) =>
    knex
        .select(`${playlistSchema.columns.id}`)
        .select(`${playlistSchema.columns.name}`)
        .select(`${playlistSchema.columns.createdAt}`)
        .select(`${playlistSchema.columns.userId}`)
