"use strict";
define([
    'backbone', 'app/Models/Episode'
], function(Backbone, Episode) {
    var Episodes = Backbone.Collection.extend({
        model: Episode
    });

    return Episodes;
});