'use strict';

if (!Array.prototype.single) {
    Array.prototype.single = function (fun) {
        var res = this.filter(fun);

        if (res.length == 0)
            return null;

        if (res.length > 1)
            throw new RangeError('Multiple matches found');

        return res[0];
    };
}

if (!Array.prototype.containsAny) {
    Array.prototype.containsAny = function (array) {
        return this.some(function (a) {
            return array.some(function (b) {
                return a === b;
            });
        });
    };
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        var template = this;
        for (var i = 0; i < args.length; i++) {
            template = template.replace('{' + i + '}', args[i]);
        }
        return template;
    };
}

if (!String.prototype.sanitizeForSearch) {
    String.prototype.sanitizeForSearch = function () {
        return this.toLowerCase().replace(/à|á|ä|â/, 'a').replace(/è|é|ë|ê/, 'e').replace(/ì|í|ï|î/, 'i').replace(/ò|ó|ö|ô/, 'o').replace(/ù|ú|ü|û/, 'u');
    };
}
