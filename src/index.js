"use strict";
exports.__esModule = true;
var E = require("fp-ts/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var knex_1 = require("./knex/knex");
var PlaylistReader_1 = require("./persistence/playlists/PlaylistReader");
PlaylistReader_1.PlaylistReaderImpl(knex_1.knex).findOne(1, 5)().then(function (eitherPlaylist) {
    return pipeable_1.pipe(eitherPlaylist, E.fold(function (error) { return console.log(error); }, function (playlist) { return console.log(playlist); }));
});
