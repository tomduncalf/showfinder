define([
    'backbone', 'app/models/Episode'
], function(Backbone, Episode) {
    var Episodes = Backbone.Collection.extend({
        model: Episode
    });

    return Episodes;
});