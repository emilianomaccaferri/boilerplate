"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _error_message, _error_code, _response;
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPError {
    constructor(error_message, error_code) {
        _error_message.set(this, void 0);
        _error_code.set(this, void 0);
        _response.set(this, void 0);
        __classPrivateFieldSet(this, _error_message, error_message);
        __classPrivateFieldSet(this, _error_code, error_code);
        __classPrivateFieldSet(this, _response, {
            success: false,
            error: __classPrivateFieldGet(this, _error_message),
            status: __classPrivateFieldGet(this, _error_code)
        });
    }
    toResponse(res) {
        return res.status(__classPrivateFieldGet(this, _error_code)).json(__classPrivateFieldGet(this, _response));
    }
    addParam(key, value) {
        __classPrivateFieldGet(this, _response)[key] = value;
        return this;
    }
    addParams(params) {
        Object.keys(params)
            .forEach(key => {
            __classPrivateFieldGet(this, _response)[key] = params[key];
        });
        return this;
    }
}
exports.default = HTTPError;
_error_message = new WeakMap(), _error_code = new WeakMap(), _response = new WeakMap();
// errors
HTTPError.USER_EXISTS = new HTTPError('user_exists', 409);
HTTPError.NOT_FOUND = new HTTPError('not_found', 404);
HTTPError.INVALID_CREDENTIALS = new HTTPError('invalid_credentials', 401);
HTTPError.EXPIRED_CREDENTIALS = new HTTPError('expired_credentials', 401);
HTTPError.MALFORMED_CREDENTIALS = new HTTPError('malformed_credentials', 400);
HTTPError.GENERIC_ERROR = new HTTPError('generic_error', 500);
HTTPError.USER_NOT_FOUND = new HTTPError('user_not_found', 400);
HTTPError.missingParameters = (...params) => new HTTPError('missing_parameters', 400).addParam('missing', params);
