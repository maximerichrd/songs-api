"use strict";
exports.__esModule = true;
var E = require("fp-ts/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var knex_1 = require("./knex/knex");
var PlaylistReader_1 = require("./persistence/playlists/PlaylistReader");
var user1 = {
    id: 1,
    lastname: 'Guardi',
    firstname: 'Antonio',
    username: 'anto',
    email: 'anto@guardi.it',
    principalLang: 'en'
};
PlaylistReader_1.PlaylistReaderImpl(knex_1.knex).findOne(user1, 6)().then(function (eitherPlaylist) {
    return pipeable_1.pipe(eitherPlaylist, E.fold(function (error) { return console.log(error); }, function (playlist) { return console.log(playlist); }));
});
