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
        qunit: {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
        } 
    },
    paths: {
        // From main.js
        jquery: '../../bower_components/jquery/dist/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
        bootstrap: '../../bower_components/sass-bootstrap/dist/js/bootstrap',
        select2: '../../bower_components/select2/select2',

        // Test specific
        app: '../../scripts/app',
        qunit: '../../bower_components/qunit/qunit/qunit'
    }
});

require([
    'jquery', 'qunit', 'test/FinderTest'
], function ($, QUnit, FinderTest) {
    $(document).ready(function() {
        FinderTest.run();

        QUnit.load();
        QUnit.start();
    });
});
