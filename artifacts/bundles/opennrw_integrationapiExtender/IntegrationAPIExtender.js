/**
 * COPYRIGHT 2018 con terra GmbH Germany
 */
define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/_base/lang",
        "ct/_lang",
        "ct/_when",
        "ct/array",
        "ct/async"
    ],
    function(declare, d_array, d_lang, ct_lang, ct_when, ct_array, ct_async) {
        return declare([],
            {


                activate: function() {
                    var mapAppsIntegrationAPI = this.mapAppsIntegrationAPI;
                    mapAppsIntegrationAPI.loadServiceViaSDILoadServiceParameterResolver = d_lang.hitch(this, this.loadServiceViaSDILoadServiceParameterResolver);
                    mapAppsIntegrationAPI.loadServiceViaServiceParameterResolver = d_lang.hitch(this, this.loadServiceViaServiceParameterResolver);
                },

                deactivate: function() {
                    this.mapAppsIntegrationAPI && delete this.mapAppsIntegrationAPI.loadServiceViaSDILoadServiceParameterResolver && delete this.mapAppsIntegrationAPI.loadServiceViaServiceParameterResolver;
                },


                //this component primarily calls the standard sdi-loadservice function
                //the one and only patch is located in opennrw_integrationapiExtender\LoadServiceConnectorPatch.js which ensures that urlParams and the url itself a handled correctly
                loadServiceViaSDILoadServiceParameterResolver: function (params) {
                    console.log("Load URL via integrationAPI and SDILoadServiceParameterResolver!");
                    //using bfn_addservice
                    if (params.serviceURL && this._serviceParameterResolver) {
                        ct_async.hitch(this, function () {
                            this._addedServicesParameterResolver.decodeURLParameter({serviceURL: params.serviceURL});
                        }, 100)();
                    }
                },

                //this component is implemented as a separate parametrizable; Service-Adding is processed via tool-manipulation and by calling ui function in ServiceParameterResolver.js
                //please note that it is crucial that the <patchBundle>\LoadServiceWizardController.js file is loaded before this integrationExtender is loaded. This can be ensured by defining the bundleStart level (patchBundle needs a lower value like "2")
                loadServiceViaServiceParameterResolver: function (params) {
                    console.log("Load URL via integrationAPI amd custom ServiceParameterResolver");
                    //using _serviceParameter Resolver
                    if (params.serviceURL && this._serviceParameterResolver) {
                        this._serviceParameterResolver.decodeURLParameter({serviceURL: params.serviceURL});
                        this._newResult = null;
                    }
                }

            });
    });