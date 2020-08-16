import { Component } from "react";
import axios from "axios";
import _merge from "lodash-es/merge";

export default class Ajax {
    constructor(options) {
        this.options = options ? options : {};
    }

    instance = () => Ajax.instance(this.options);

    static setGlobalOptions = (options) => {
        axios.defaults = _merge({}, axios.defaults, Ajax.buildOptions(options));
    };

    static buildOptions = (options) => {
        if (!options) {
            return null;
        }
        const config = {};
        if (options.baseURL) {
            config.baseURL = options.baseURL;
        }
        if (options.headerAuthorization) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }
            const authorization =
                typeof options.headerAuthorization === "string"
                    ? options.headerAuthorization
                    : options.headerAuthorization();
            const keyAuthorization = "x-access-token";
            config.headers.common[keyAuthorization] = authorization;
        }
        if (options.headers) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }
            for (const key of Object.keys(options.headers)) {
                config.headers.common[key] = options.headers[key];
            }
        }
        return config;
    };
    static instance = (options) => {
        const result = options
            ? axios.create(Ajax.buildOptions(options))
            : axios.create();

        if (options) {
            if (options.onRequest || options.onRequestError) {
                result.interceptors.request.use(
                    options.onRequest || ((config) => config),
                    options.onRequestError || ((error) => Promise.reject(error))
                );
            }
            if (options.onResponse || options.onResponseError) {
                result.interceptors.response.use(
                    options.onResponse || ((response) => response),
                    options.onResponseError ||
                        ((error) => Promise.reject(error))
                );
            }
        }

        result.interceptors.response.use(
            (response) => response.data,
            (error) => Promise.reject(error.response)
        );

        return result;
    };

    get = (url) => {
        return this.instance().get(url);
    };
    post = (url, data) => {
        return this.instance().post(url, data);
    };
    postForm = (url, data) => {
        const formData = new FormData();
        Object.keys(data).forEach((k) => {
            formData.append(k, data[k]);
        });
        return this.instance().post(url, formData);
    };
    remove = (url) => {
        return this.instance().delete(url);
    };
    put = (url, data) => {
        return this.instance().put(url, data);
    };
    patch = (url, data) => {
        return this.instance().patch(url, data);
    };
}
