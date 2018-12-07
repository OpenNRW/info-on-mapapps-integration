# Integrating mapapps viewer in open.nrw
Integrating map.apps as a geoviewer component in the context of open.nrw allows to load a linked ArcGIS Server / Inspire View or WMS Service directly to the map. Within map.apps the user can review the service structure to choose the layers of interest.
The integration can be done in three different ways, which are described in the following. For each integration option, two samples are included:
* Demonstrating the basic technical concept (plain_xxx.html files)
* Showing an embedded open.nrw implementation. An approach of parsing the underlying metadata .jsonld file is also given (opennrwdemo_xxx.html).


#### Option 1: New Tab
The geoviewer can be opened in a new tab. Thereby the `serviceURL` URL parameter is added defining the service URL, which should be loaded to the map.

#### Option 2: Iframe
The geoviewer is loaded into an iframe HTML element, which can be integrated in an existing website. This can be done declaratively using HTML or dynamically using JavaScript. Loading the service URL is realized using the `serviceURL` URL parameter, which is passed to the iframe's ``src`` attribute.

#### Option 3: Integration API
The geoviewer is loaded dynamically via JavaScript. The map.apps framework is started, which allows to launch a defined app to a target DOM node. Instead of passing the e.g. WMS service URL as an URL parameter, the map.apps Integration API is used.

## Repository content
The repository includes three artifacts:
1. demo resources: Examples for integrating map.apps. As a landing page the ``index.html`` provides a short description of the linked demos.
2. bundles: Those are needed if a service should be loaded via the integration API (option 3).
3. app: Example app configuration, which shows the minimum of required bundles.

## Pros & Cons
New Tab Integration
* Pros:
  * Easy implementation
  * No need of modifying the underlying website (no additional HTML elements are needed)
  * No need of css modifications or css dependencies
  * No need of controlling the overall layout
  * No requirements

* Cons
  * No "one-site" integration, but instead a completely detached and separate Browser Tab is used.
  * No control mechanisms possible.


iframe Integration
* Pros:
  * Easy implementation
  * Implementation as a single-page / one-site integration
  * No need of css modifications or css dependencies
  * Only one additional DIV anchor element is needed
  * No asynchronous mechanism is needed

* Cons
  * Security rules must be taken into account: Original map.apps webserver host must allow iframe integrations from your domain (cf. https://www.geoportal.nrw/gdi-nw/zent_komp --> GEOviewer.NRW)
  * No control mechanisms possible


DIV Integration
* Pros:
  * Wide function range of map.apps Integration-API is usable.
  * Viewer is part of overall webpage context.
  * Control of elements using map.apps loading state(s) is possible

* Cons
  * Loading time is longer than with the other options (geoviewer is completely loaded in the website context)
  * Controlling of button visibility is needed because of asynchronous loading time.
  * css adoptions are needed to control map.apps viewer correctly. map.apps DIV needs to be defined with an initial height and width! z-Index and position are used to show the map.apps pane correctly.



## Requirements

New Tab Integration:
* "parametermanager" and  "sdi_loadservice" Bundle need to be listed in the allowedBundles section for the used map.apps app.

iframe Integration:
* "parametermanager" and "sdi_loadservice" Bundle need to be listed in the allowedBundles section for the used map.apps app.
* map.apps webserver Host must allow iframe integrations from your domain.

DIV Integration:
* "parametermanager", "integration", "sdi_loadservice", "opennrw_integrationapiExtender" and "opennrw_patches" Bundle need to be listed in the allowedBundles section for the used map.apps app.
* "opennrw_integrationapiExtender" and "opennrw_patches" Bundle need to be installed in the used map.apps instance.



## Recommendations
* For all integration options a custom app should be defined, where only needed bundles should be loaded. This ensure to keep the loading time as short as possible. An example of a app is included in this repository.
* A corporate design might be a valuable approach.

In respect to a integration scenario, the iframe approach might be the easiest way if you would like to integrate the mapapps viewer itself. If the infrastructure requirements are met (map.apps webserver host allows iframe integration from your domain), the performance of the overall metadata website is not affected. Additionally you do not need to deal with asynchronous functions or css modifications.
