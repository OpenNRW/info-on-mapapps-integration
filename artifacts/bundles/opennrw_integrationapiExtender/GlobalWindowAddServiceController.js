define([
    "dojo/_base/declare","dojo/_base/lang", "ct/array", "ct/async"],
    function (declare,d_lang, ct_array, ct_async) {
        /*
         * COPYRIGHT 2018 con terra GmbH Germany
         */
        return declare([],
            {

                constructor: function () {

                },

                //This function exposes a global window function which can be used to load a service to the mapapps instance using the _addedServicesParameterResolver (which is part of the sdi_loadservice)
                //The LoadServiceConnector is patched using <pathes\LoadServiceConnectorPatch - this ensures that all URL params (which could be included in the wms url) are removed and the URL is correctly decoded; otherwise the request to the sdi-ext ServiceTypeRevolver will be malformed
                activate: function () {
                    window.name="mapapps";
                    window.addService = (function(component) {
                        return function(url) {
                            var addedServicesParameterResolver = component._addedServicesParameterResolver;
                            ct_async.hitch(this, function(){
                                addedServicesParameterResolver.decodeURLParameter({serviceURL: url});
                            }, 100)();
                        };
                    }(this));
                },

                deactivate: function () {
                    window.addService = function(){};
                }
            });
    }
);
