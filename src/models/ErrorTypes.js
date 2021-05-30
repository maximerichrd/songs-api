"use strict";
exports.__esModule = true;
exports.DomainError = void 0;
function DomainError(clientMessage) {
    return {
        type: "Domain Error",
        clientMessage: clientMessage
    };
}
exports.DomainError = DomainError;
