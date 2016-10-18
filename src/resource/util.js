var debug = false, util = {}, { slice } = [];

export const assign = Object.assign || _assign;

export function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}
export function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}
export function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

export function each(obj, iterator) {

    var i, key;

    if (obj && typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

export function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

export function when(value, fulfilled, rejected) {

    var promise = Promise.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
export function isFunction(val) {
    return typeof val === 'function';
}
export function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}
export function isBoolean(val) {
    return val === true || val === false;
}

export function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

export const isArray = Array.isArray;

export function isString(val) {
    return typeof val === 'string';
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

export function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {
        _merge(target, source, true);
    });

    return target;
}

export function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

export function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

export function caonima(params){
    let arr = [];
    for (var i in params) {
        arr.push(params[i]);
    }
    return arr;
}