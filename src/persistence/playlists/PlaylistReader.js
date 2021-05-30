"use strict";
exports.__esModule = true;
exports.PlaylistReaderImpl = void 0;
var TE = require("fp-ts/lib/TaskEither");
var playlistSchema = require("./PlaylistSchema");
var pipeable_1 = require("fp-ts/lib/pipeable");
var dbUtils_1 = require("../../knex/dbUtils");
function PlaylistReaderImpl(knex) {
    return {
        findOne: findOne(knex)
    };
}
exports.PlaylistReaderImpl = PlaylistReaderImpl;
function findOne(knex) {
    return function (userID, playlistID) {
        var selectPlaylistQuery = buildSelectQueryPlaylist(knex)(selectPlaylistFields)
            .where("" + playlistSchema.columns.userId, userID)
            .andWhere("" + playlistSchema.columns.id, playlistID);
        return pipeable_1.pipe(TE.Do, TE.bind("playlistRows", function () {
            return dbUtils_1.executeQuery(selectPlaylistQuery);
        }), TE.map(function (_a) {
            var playlistRows = _a.playlistRows;
            return playlistRows;
        }));
    };
}
var buildSelectQueryPlaylist = function (knex) { return function (baseQueryBuilder) {
    return baseQueryBuilder(knex)
        .from(playlistSchema.tableName);
}; };
var selectPlaylistFields = function (knex) {
    return knex
        .select("" + playlistSchema.columns.id)
        .select("" + playlistSchema.columns.name)
        .select("" + playlistSchema.columns.createdAt)
        .select("" + playlistSchema.columns.userId);
};
