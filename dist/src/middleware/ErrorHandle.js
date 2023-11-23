"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandle = void 0;
const ErrorHandle = (err, req, res, next) => {
    return res.status(err.status).json({
        ok: false,
        message: err.message,
        status: err.status,
    });
};
exports.ErrorHandle = ErrorHandle;
