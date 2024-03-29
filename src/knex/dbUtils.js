"use strict";
exports.__esModule = true;
exports.isNonEmptyArray = exports.executeQuery = void 0;
var TE = require("fp-ts/lib/TaskEither");
var ErrorTypes_1 = require("../models/ErrorTypes");
var executeQuery = function (baseQuery) {
    return TE.tryCatch(function () { return baseQuery.clone().then(); }, function (error) { return ErrorTypes_1.DomainError(String(error)); });
};
exports.executeQuery = executeQuery;
function isNonEmptyArray(arr) {
    return arr.length > 0;
}
exports.isNonEmptyArray = isNonEmptyArray;
