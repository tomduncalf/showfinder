define([
    'backbone'
], function(Backbone) {
    var EpisodeView = Backbone.View.extend({
        tagName: "li",

        className: "episode-row",

        events: {
            "click .icon": "open",
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            var $a = $('<a target="_blank"/>');
            $a.attr('href', this.model.get("href"));
            $a.html(this.model.get("title"));
            this.$el.append($a);
            return this;
        }
    });

    return EpisodeView;
});