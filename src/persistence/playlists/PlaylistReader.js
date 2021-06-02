"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.PlaylistReaderImpl = void 0;
var TE = require("fp-ts/lib/TaskEither");
var ErrorTypes_1 = require("../../models/ErrorTypes");
var playlistSchema = require("./PlaylistSchema");
var songSchema = require("../songs/SongSchema");
var playlistSongSchema = require("../playlist-song/PlaylistSongSchema");
var pipeable_1 = require("fp-ts/lib/pipeable");
var dbUtils_1 = require("../../knex/dbUtils");
var DescriptionTranslationReader_1 = require("../description-translations/DescriptionTranslationReader");
function PlaylistReaderImpl(knex) {
    return {
        findOne: findOne(knex)
    };
}
exports.PlaylistReaderImpl = PlaylistReaderImpl;
function findOne(knex) {
    return function (user, playlistID) {
        var selectPlaylistQuery = buildSelectQueryPlaylist(knex)(selectPlaylistFields)
            .where("" + playlistSchema.columns.userId, user.id)
            .andWhere("" + playlistSchema.columns.id, playlistID);
        var selectSongsQuery = function (id) {
            var _a;
            return buildSelectQuerySongs(knex)
                .where((_a = {},
                _a[songSchema.columns.playlistId] = id,
                _a));
        };
        return pipeable_1.pipe(TE.Do, TE.bind("playlistRows", function () {
            return dbUtils_1.executeQuery(selectPlaylistQuery);
        }), TE.filterOrElse(function (_a) {
            var playlistRows = _a.playlistRows;
            return dbUtils_1.isNonEmptyArray(playlistRows);
        }, function (_) { return ErrorTypes_1.DomainError("Check params, no result"); }), TE.bind("songRows", function (_a) {
            var playlistRow = _a.playlistRows[0];
            return dbUtils_1.executeQuery(selectSongsQuery(playlistRow.id));
        }), TE.bind("translationRows", function (_a) {
            var songRows = _a.songRows;
            return DescriptionTranslationReader_1.getTranslatedDescriptions(knex, user, songRows);
        }), TE.map(function (_a) {
            var playlistRows = _a.playlistRows, songRows = _a.songRows, translationRows = _a.translationRows;
            var songs = songRows.map(function (s) {
                return translationRows.map(function (t) { return t.song_id; }).includes(s.song_id)
                    ? __assign(__assign({}, s), { description: translationRows.filter(function (t) { return t.song_id === s.song_id; }).map(function (t) { return t.value; })[0] }) : s;
            });
            return songs;
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
var buildSelectQuerySongs = function (knex) {
    return selectSongFields(knex)
        .from(knex.ref("" + playlistSongSchema.tableName).as(playlistSongSchema.prefix))
        .innerJoin(knex.ref("" + songSchema.tableName).as(songSchema.prefix), playlistSongSchema.prefix + "." + playlistSongSchema.columns.songId, songSchema.prefix + "." + songSchema.columns.id)
        .innerJoin(knex.ref("" + playlistSchema.tableName).as(playlistSchema.prefix), playlistSongSchema.prefix + "." + playlistSongSchema.columns.playlistId, playlistSchema.prefix + "." + playlistSchema.columns.id);
};
var selectSongFields = function (knex) {
    return knex
        .select(knex
        .ref(songSchema.prefix + "." + songSchema.columns.id)
        .as("" + songSchema.SongId))
        .select(songSchema.prefix + "." + songSchema.columns.name)
        .select(songSchema.prefix + "." + songSchema.columns.author)
        .select(songSchema.prefix + "." + songSchema.columns.description)
        .select(songSchema.prefix + "." + songSchema.columns.duration);
};
