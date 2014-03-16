/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        select2: {
            deps: ['jquery'],
            exports: 'jquery'
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        select2: '../bower_components/select2/select2'
    }
});

require([
    'backbone', 'jquery', 'app/Controllers/EpisodeFinderController'
], function (Backbone, $, EpisodeFinderController) {
    Backbone.history.start();

    var controller = new EpisodeFinderController();
});
