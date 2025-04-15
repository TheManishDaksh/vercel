"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateIdForSession;
function generateIdForSession() {
    const subset = "1234567890qwertyuiopasdfghjklzxcvvvnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const length = 5;
    let id = "";
    for (let i = 0; i < length; i++) {
        id += subset[Math.floor(Math.random() * subset.length)];
    }
    return id;
}
