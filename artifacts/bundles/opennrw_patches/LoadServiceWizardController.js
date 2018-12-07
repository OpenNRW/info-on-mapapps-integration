require(["dojo/_base/lang", "sdi_loadservice/LoadServiceWizardController"],
    function (d_lang, LoadServiceWizardController) {
        d_lang.extend(LoadServiceWizardController, {
            createInstance: function () {
                var wizard = this._wizard;
                //BEGIN PATCH
                //Call function to create needed loadService method; function is needed in opennrw_integrationapiExtender.ServiceParameterResolver
                this._addLoadServiceToWizard(wizard);
                //END PATCH
                return wizard;
            },
            _addLoadServiceToWizard: function (wizard) {
                if (wizard.loadService === undefined) {
                    var loadServiceWidget = this._tabContainer.getChildren()[0];
                    wizard.loadService = function (url) {
                        loadServiceWidget.get("_textbox").set("value", url);
                        loadServiceWidget._onSubmit({keyCode: 0});
                    }
                }
            }
        });
    }
);
