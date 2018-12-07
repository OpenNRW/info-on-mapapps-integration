/*
 * COPYRIGHT 2018 con terra GmbH Germany
 */
/**
 * @fileOverview
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "ct/async",
    "ct/Stateful"
], function (declare, d_lang, d_query, ct_async, Stateful) {
    return declare([Stateful], {
        //injected
        _loadServiceCtrl: null,
        _loadServiceTool: null,
        //local
        _serviceURL: null,
        _firstLoadService: null,

        encodeURLParameter: function (opts) {
            return {}
        },
        decodeURLParameter: function (parameterObject) {
            this._serviceURL = parameterObject.serviceURL || null;
            this._serviceURL && ct_async(this.applyParameter, this);
        },
        applyParameter: function () {
            var loadServiceCtrl = this._loadServiceCtrl;
            var loadServiceTool = this._loadServiceTool;
            if (loadServiceCtrl && loadServiceTool) {
                !loadServiceTool.get("active") && loadServiceTool.set("active", true);
                var serviceUrl = this._serviceURL;
                //use custom timeout in order to ensure that all events are processed correctly
                //if a service was added previously, timeout can be shorter
                var intervalTime = this._firstLoadService ? 500 : 50;
                this._firstLoadService = false;
                setTimeout(d_lang.hitch(this, function () {
                    loadServiceCtrl.loadService(serviceUrl);
                }), intervalTime);
            }
            this._serviceURL = null;
        }
    });
});
