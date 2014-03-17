"use strict";
define([
    'backbone', 'app/Views/EpisodeView'
], function(Backbone, EpisodeView) {
    var EpisodesView = Backbone.View.extend({
        tagName: 'ul',

        initialize: function(){
        },

        render: function(){
            this.collection.each(function(episode){
                var episodeView = new EpisodeView({ model: episode});
                this.$el.append(episodeView.render().el);
            }, this);
            return this;
        }
    }); 

    return EpisodesView;
});