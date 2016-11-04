import { NgModule } from '@angular/core';
import { HttpModule, Http, Headers as AngularHeaders, Request, RequestOptions, RequestMethod as RequestMethods, URLSearchParams } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/**
* Angular 2 RESTClient class.
*
* @class RESTClient
* @constructor
*/
export var RESTClient = (function () {
    function RESTClient(http) {
        this.http = http;
    }
    RESTClient.prototype.getBaseUrl = function () {
        return null;
    };
    ;
    RESTClient.prototype.getDefaultHeaders = function () {
        return null;
    };
    ;
    /**
    * Request Interceptor
    *
    * @method requestInterceptor
    * @param {Request} req - request object
    */
    RESTClient.prototype.requestInterceptor = function (req) {
        //
    };
    /**
    * Response Interceptor
    *
    * @method responseInterceptor
    * @param {Response} res - response object
    * @returns {Response} res - transformed response object
    */
    RESTClient.prototype.responseInterceptor = function (res) {
        return res;
    };
    RESTClient.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RESTClient.ctorParameters = [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
    ];
    return RESTClient;
}());
/**
 * Set the base URL of REST resource
 * @param {String} url - base URL
 */
export function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return url;
        };
        return Target;
    };
}
/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function DefaultHeaders(headers) {
    return function (Target) {
        Target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return Target;
    };
}
function paramBuilder(paramName) {
    return function (key) {
        return function (target, propertyKey, parameterIndex) {
            var metadataKey = propertyKey + "_" + paramName + "_parameters";
            var paramObj = {
                key: key,
                parameterIndex: parameterIndex
            };
            if (Array.isArray(target[metadataKey])) {
                target[metadataKey].push(paramObj);
            }
            else {
                target[metadataKey] = [paramObj];
            }
        };
    };
}
/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export var Path = paramBuilder('Path');
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export var Query = paramBuilder('Query');
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export var Body = paramBuilder('Body')('Body');
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export var Header = paramBuilder('Header');
/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function Headers(headersDef) {
    return function (target, propertyKey, descriptor) {
        descriptor.headers = headersDef;
        return descriptor;
    };
}
/**
 * Defines the media type(s) that the methods can produce
 * @param MediaType producesDef - mediaType to be parsed
 */
export function Produces(producer) {
    return function (target, propertyKey, descriptor) {
        descriptor.producer = producer;
        return descriptor;
    };
}
/**
 * Supported @Produces media types
 */
export var MediaType;
(function (MediaType) {
    MediaType[MediaType["JSON"] = 0] = "JSON";
})(MediaType || (MediaType = {}));
function methodBuilder(method) {
    return function (url) {
        return function (target, propertyKey, descriptor) {
            var pPath = target[(propertyKey + "_Path_parameters")];
            var pQuery = target[(propertyKey + "_Query_parameters")];
            var pBody = target[(propertyKey + "_Body_parameters")];
            var pHeader = target[(propertyKey + "_Header_parameters")];
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // Body
                var body = null;
                if (pBody) {
                    body = JSON.stringify(args[pBody[0].parameterIndex]);
                }
                // Path
                var resUrl = url;
                if (pPath) {
                    for (var k in pPath) {
                        if (pPath.hasOwnProperty(k)) {
                            resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
                        }
                    }
                }
                // Query
                var search = new URLSearchParams();
                if (pQuery) {
                    pQuery
                        .filter(function (p) { return args[p.parameterIndex]; }) // filter out optional parameters
                        .forEach(function (p) {
                        var key = p.key;
                        var value = args[p.parameterIndex];
                        // if the value is a instance of Object, we stringify it
                        if (value instanceof Object) {
                            value = JSON.stringify(value);
                        }
                        search.set(encodeURIComponent(key), encodeURIComponent(value));
                    });
                }
                // Headers
                // set class default headers
                var headers = new AngularHeaders(this.getDefaultHeaders());
                // set method specific headers
                for (var k in descriptor.headers) {
                    if (descriptor.headers.hasOwnProperty(k)) {
                        headers.append(k, descriptor.headers[k]);
                    }
                }
                // set parameter specific headers
                if (pHeader) {
                    for (var k in pHeader) {
                        if (pHeader.hasOwnProperty(k)) {
                            headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
                        }
                    }
                }
                // Request options
                var options = new RequestOptions({
                    method: method,
                    url: this.getBaseUrl() + resUrl,
                    headers: headers,
                    body: body,
                    search: search
                });
                var req = new Request(options);
                // intercept the request
                this.requestInterceptor(req);
                // make the request and store the observable for later transformation
                var observable = this.http.request(req);
                // intercept the response
                observable = this.responseInterceptor(observable);
                // transform the obserable in accordance to the @Produces decorator
                if (descriptor.producer) {
                    observable = observable.map(descriptor.producer);
                }
                return observable;
            };
            return descriptor;
        };
    };
}
/**
 * GET method
 * @param {string} url - resource url of the method
 */
export var GET = methodBuilder(RequestMethods.Get);
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export var POST = methodBuilder(RequestMethods.Post);
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export var PUT = methodBuilder(RequestMethods.Put);
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export var DELETE = methodBuilder(RequestMethods.Delete);
/**
 * HEAD method
 * @param {string} url - resource url of the method
 */
export var HEAD = methodBuilder(RequestMethods.Head);
export var RESTModule = (function () {
    function RESTModule() {
    }
    RESTModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [HttpModule],
                    exports: [HttpModule],
                    providers: [RESTClient]
                },] },
    ];
    /** @nocollapse */
    RESTModule.ctorParameters = [];
    return RESTModule;
}());
//# sourceMappingURL=rest.module.js.map