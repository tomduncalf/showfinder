define([
    'jquery', 'underscore', 'app/Scraper', 'app/Finder', 'app/Views/EpisodesView', 'select2'
], function($, _, Scraper, Finder, EpisodesView) {
    var EpisodeFinderController = function() {
        this._initDom();

        var scraper = new Scraper();
        this.finder = new Finder();

        scraper.go().done(function(episodeData) {
            this.finder.setData(episodeData);
            this._initForm();
        }.bind(this));
    }

    EpisodeFinderController.prototype._initDom = function() {
        this.$form = $('#js-search-form');
        this.$results = $('#js-results');
        this.$characterNames = $('#character-names');
        this.$characterNames.select2();
    }

    EpisodeFinderController.prototype._initForm = function() {
        var characters = this.finder.getAllCharacters();
        characters.forEach(function(character) {
            this.$characterNames.append('<option value="' + character + '">' + character + '</option>');
        }.bind(this));

        this.$form.submit(function(e) {
            e.preventDefault();
            var episodesCollection = this.finder.getEpisodesWithCharacters(this.$characterNames.val());
            var view = new EpisodesView({ collection: episodesCollection });
            this.$results.html(view.render().el);
        }.bind(this));
    }

    return EpisodeFinderController;
});
