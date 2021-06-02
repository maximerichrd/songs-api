"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getTranslatedDescriptions = void 0;
var descriptionTranslationSchema = require("./DescriptionTranslationSchema");
var pipeable_1 = require("fp-ts/lib/pipeable");
var dbUtils_1 = require("../../knex/dbUtils");
var TE = require("fp-ts/lib/TaskEither");
function getTranslatedDescriptions(knex, user, songs) {
    var _a;
    var selectQuery = buildSelectQuerySong(knex)
        .whereIn(descriptionTranslationSchema.columns.lang, [user.principalLang, (_a = user.secondaryLang) !== null && _a !== void 0 ? _a : ""])
        .whereIn(descriptionTranslationSchema.prefix + "." + descriptionTranslationSchema.columns.songId, __spreadArray([], songs.map(function (s) { return s.song_id; })));
    return pipeable_1.pipe(TE.Do, TE.bind("translationRows", function () {
        return dbUtils_1.executeQuery(selectQuery);
    }), TE.map(function (_a) {
        var translationRows = _a.translationRows;
        var firstArr = translationRows.filter(function (r) { return r.lang === user.principalLang; });
        var secArr = [];
        if (user.secondaryLang !== undefined) {
            secArr = translationRows.filter(function (r) { return r.lang === user.secondaryLang; });
        }
        var arr = [];
        songs.map(function (song) {
            firstArr.map(function (r) {
                if (r.song_id === song.song_id && r.lang === user.principalLang) {
                    arr.push(r);
                    secArr = secArr.filter(function (r) { return r.song_id !== song.song_id; });
                }
            });
        });
        return __spreadArray(__spreadArray([], arr), secArr);
    }));
}
exports.getTranslatedDescriptions = getTranslatedDescriptions;
var selectSongFields = function (knex) {
    return knex
        .select(descriptionTranslationSchema.columns.lang)
        .select(descriptionTranslationSchema.columns.value)
        .select(descriptionTranslationSchema.prefix + "." + descriptionTranslationSchema.columns.songId);
};
var buildSelectQuerySong = function (knex) {
    return selectSongFields(knex)
        .from(knex.ref("" + descriptionTranslationSchema.tableName).as(descriptionTranslationSchema.prefix));
};
