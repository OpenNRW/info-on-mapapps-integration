define([
        "dojo/_base/declare",
        "dojo/aspect",
        "dojo/io-query",
        "ct/_Connect"
    ],
    function (declare, d_aspect, d_IoQuery, _Connect) {
        return declare([_Connect],
            {
                activate: function () {
                    //BEGIN PATCH - Add custom handling for url parsing
                    //this ensures that url is correctly passed to str resolver without queryParams and in the correct formatz
                    var defaultParams = [
                        "request",
                        "service",
                        "version",
                        "lang"
                    ];
                    d_aspect.before(this.loadServiceConnector, "load", function (url) {
                        var uriS = url.split("?");
                        var baseUrl = uriS[0];
                        var queryObj = uriS.length > 1 && d_IoQuery.queryToObject(uriS[1]);
                        for (var p in queryObj) {
                            if (defaultParams.indexOf(p.toLowerCase()) != -1) {
                                delete queryObj[p];
                            }
                        }
                        var encodedUrl = d_IoQuery.objectToQuery(queryObj);
                        return encodedUrl === "" ? [baseUrl] : [baseUrl + "?" + decodeURIComponent(encodedUrl)];
                    });
                    //END PATCH
                }
            });
    });