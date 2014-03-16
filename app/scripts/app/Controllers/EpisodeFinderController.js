define([
    'jquery', 'underscore', 'app/Scraper', 'app/Finder', 'app/Views/EpisodesView'
], function($, _, Scraper, Finder, EpisodesView) {
    var EpisodeFinderController = function() {
        var scraper = new Scraper();
        this.finder = new Finder();

        scraper.go().done(function(episodeData) {
            this.finder.setData(episodeData);
            console.log(this.finder.getAllCharacters());
            this.initForm();
        }.bind(this));
    }

    EpisodeFinderController.prototype.initForm = function() {
        $('#js-search-form').submit(function(e) {
            e.preventDefault();
            var episodesCollection = this.finder.getEpisodesWithCharacters(
                _.map($('#character-names').val().split(','), function(name) {
                    return name.trim();
                })
            );
            var view = new EpisodesView({ collection: episodesCollection });
            $('#js-results').html(view.render().el);
        }.bind(this));
    }

    return EpisodeFinderController;
});
